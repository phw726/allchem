import { useQueries } from '@tanstack/react-query'
import {
  parseBasicInfo,
  parsePhysicalCode,
  parseToxicProps,
  useCodeMapping,
} from '@/hooks/useCodeMapping'
import { useGroupByLabel } from '@/hooks/useGroup'
import { fetchStudyRecord } from './fetchIuclid6'
import { getCodeValue } from '@/data/iuclid6/getCodeValue'
import { parseToxicPropsNew } from '@/hooks/useIuclidMapping'

export const useIuclidCompound = ({
  dossierId,
  enabled = true,
}: {
  dossierId: string
  enabled?: boolean
}) => {
  // const { getCodeValue } = useCodeMapping()

  const queries = useQueries({
    queries: [
      {
        queryKey: ['basicInfo', dossierId],
        queryFn: () => fetchStudyRecord(dossierId, 'basicInfo'),
        staleTime: 60000, // 1분 동안 캐싱
        enabled: !!dossierId,
      },
      {
        queryKey: ['physicalProps', dossierId],
        queryFn: () => fetchStudyRecord(dossierId, 'physicalProps'),
        staleTime: 60000,
      },
      {
        queryKey: ['toxicProps', dossierId],
        queryFn: () => fetchStudyRecord(dossierId, 'toxicProps'),
        staleTime: 60000,
      },
    ],
  })

  // 데이터 변환
  const basicInfoData = queries[0].data || []
  const physicalData = queries[1].data || []
  const toxicData = queries[2].data || []

  const isLoading = queries.some(q => q.isLoading)
  const isLoadingBasicInfo = queries[0].isLoading
  const isLoadingPhysicalProps = queries[1].isLoading
  const isLoadingToxicProps = queries[2].isLoading
  const isError = queries.some(q => q.isError)

  const basicInfo = parseBasicInfo(basicInfoData)
  const rawPhysicalData = physicalData.flatMap(({ endpointKey, data }) =>
    parsePhysicalCode(data, getCodeValue, endpointKey),
  )
  const rawToxicData = toxicData.flatMap(({ endpointKey, data }) =>
    parseToxicPropsNew(data, endpointKey),
  )

  const physicalProps = useGroupByLabel(rawPhysicalData)
  const toxicProps = useGroupByLabel(rawToxicData)

  return {
    data: {
      basicInfo,
      physicalProps,
      toxicProps,
    },
    isLoading,
    isLoadingBasicInfo,
    isLoadingPhysicalProps,
    isLoadingToxicProps,
    isError,
    refetch: () => queries.forEach(q => q.refetch()),
  }
}
