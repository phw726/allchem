import { useCallback, useEffect, useState } from 'react'
import { IUCLID_ENDPOINT } from './endpoint'
import {
  parseBasicInfo,
  parsePhysicalCode,
  parseToxicProps,
  useCodeMapping,
} from '@/hooks/useCodeMapping'
import { useGroupByLabel } from '@/hooks/useGroup'

const proxyURL = process.env.NEXT_PUBLIC_IUCLID_BASE_URL

export const fetchStudyRecord = async (
  dossierId: string,
  studyType: keyof typeof IUCLID_ENDPOINT | 'basicInfo',
): Promise<{ endpointKey: string; data: any[] }[]> => {
  try {
    if (studyType === 'basicInfo') {
      /// 1. Reference substance의 uri 리스트 받기기
      const studyEndpoint = 'Reference_substance'
      const endpoint = `dossier/${dossierId}/${studyEndpoint}`
      const fullUrl = `${proxyURL}?endpoint=${endpoint}`
      const response = await fetch(fullUrl)
      const result = await response.json()

      /// 2. 응답된 uri에서 recordId 추출해서 api 재요청하기
      const recordBasicRequests =
        result.results?.map((item: { uri: string }) => {
          const recordId = item.uri.split('/').pop()
          const detailEndpoint = `${endpoint}/${recordId}`
          const detailFullUrl = `${proxyURL}?endpoint=${detailEndpoint}`
          return fetch(detailFullUrl)
            .then(res => res.json())
            .then(data => ({ data }))
        }) || []

      const detailResults = await Promise.all(recordBasicRequests.slice(0, 1))
      return detailResults
    }

    const studyEndpoint = IUCLID_ENDPOINT[studyType]
    // Step 1: 각 endpoint에 대해 API 요청
    const requests = studyEndpoint.map(async endpointKey => {
      const DefaultEndpoint = `dossier/${dossierId}/subject/document/ENDPOINT_STUDY_RECORD.${endpointKey}`
      const fullUrl = `${proxyURL}?endpoint=${DefaultEndpoint}`
      const response = await fetch(fullUrl)
      const result = await response.json()
      return { endpointKey, result }
    })

    const studyEndpointURI = await Promise.all(requests)

    // Step 2: URI를 기반으로 상세 데이터 요청
    const recordRequests = studyEndpointURI.flatMap(
      ({ endpointKey, result }) => {
        if (!result || !Array.isArray(result.results)) return []

        return result.results
          .map((item: { uri: string }) => {
            const recordId = item.uri.split('/').pop()
            const detailEndpoint = `ENDPOINT_STUDY_RECORD.${endpointKey}/${recordId}`
            const detailFullUrl = `${proxyURL}?endpoint=${encodeURIComponent(
              `dossier/${dossierId}/subject/document/${detailEndpoint}`,
            )}`
            return fetch(detailFullUrl)
              .then(res => res.json())
              .then(data => ({ endpointKey, data }))
          })
          .slice(0, 3)
      },
    )
    const detailResults = await Promise.all(recordRequests)

    // Step 3: 데이터를 변환하여 반환
    return detailResults
  } catch (error) {
    console.error('Error fetching study record:', error)
    throw error
  }
}

export const useIUCLIDCompound = ({ dossierId }: { dossierId: string }) => {
  const [data, setData] = useState<{
    basicInfo?: { label?: string; itemDetail?: string[] }[]
    physicalProps?: { label?: string; itemDetail?: string[] }[]
    toxicProps?: { label?: string; itemDetail?: string[] }[]
    rawPhysicalData?: { label: string; itemDetail: string }[] // 추가
    rawToxicData?: { label: string; itemDetail: string }[] // 추가
  } | null>(null)

  const { getCodeValue } = useCodeMapping()

  const fetchData = useCallback(async () => {
    try {
      // Step 1: 물리적 및 독성 데이터 병렬 요청
      const [basicInfoData, physicalData, toxicData] = await Promise.all([
        fetchStudyRecord(dossierId, 'basicInfo'),
        fetchStudyRecord(dossierId, 'physicalProps'),
        fetchStudyRecord(dossierId, 'toxicProps'),
      ])

      const rawPhysicalData = physicalData.flatMap(({ endpointKey, data }) =>
        parsePhysicalCode(data, getCodeValue, endpointKey),
      )
      const rawToxicData = toxicData.flatMap(({ endpointKey, data }) =>
        parseToxicProps(data, getCodeValue, endpointKey),
      )

      const basicInfo = parseBasicInfo(basicInfoData || [])

      // Step 2: 상태 업데이트
      setData({
        basicInfo,
        rawPhysicalData,
        rawToxicData,
        physicalProps: [], // 이후 가공된 데이터로 업데이트
        toxicProps: [],
      })
    } catch (error) {
      console.error('Failed to fetch or parse data:', error)
    }
  }, [dossierId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const physicalProps = useGroupByLabel(data?.rawPhysicalData || [])
  const toxicProps = useGroupByLabel(data?.rawToxicData || [])

  return {
    data: {
      basicInfo: data?.basicInfo || [],
      physicalProps,
      toxicProps,
    },
    refetch: fetchData,
  }
}
