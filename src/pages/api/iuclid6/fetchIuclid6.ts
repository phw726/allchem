import { IUCLID_ENDPOINT } from './endpoint'

const proxyURL = process.env.NEXT_PUBLIC_IUCLID_BASE_URL

export const fetchStudyRecord = async (
  dossierId: string,
  studyType: keyof typeof IUCLID_ENDPOINT | 'basicInfo',
): Promise<{ endpointKey: string; data: any[] }[]> => {
  try {
    if (studyType === 'basicInfo') {
      // 1. Reference substance 리스트 요청
      const endpoint = `dossier/${dossierId}/Reference_substance`
      const fullUrl = `${proxyURL}?endpoint=${encodeURIComponent(endpoint)}`
      const response = await fetch(fullUrl)
      const result = await response.json()

      if (!Array.isArray(result.results)) return []

      // 2. recordId 추출 후 개별 API 요청
      const detailResults = await Promise.all(
        result.results.slice(0, 1).map(async (item: { uri: string }) => {
          const recordId = item.uri.split('/').pop()
          const detailEndpoint = `dossier/${dossierId}/Reference_substance/${recordId}`
          const detailFullUrl = `${proxyURL}?endpoint=${encodeURIComponent(detailEndpoint)}`
          const res = await fetch(detailFullUrl)
          return res.json()
        }),
      )

      return detailResults.map(data => ({
        endpointKey: 'basicInfo', // 기본 정보 요청이므로 endpointKey를 추가
        data: Array.isArray(data) ? data : [data], // 배열이 아닐 경우 배열로 변환
      }))
    }

    // physicalProps & toxicProps 처리
    const studyEndpoints = IUCLID_ENDPOINT[studyType]
    const requests = studyEndpoints.map(async endpointKey => {
      const DefaultEndpoint = `dossier/${dossierId}/subject/document/ENDPOINT_STUDY_RECORD.${endpointKey}`
      const fullUrl = `${proxyURL}?endpoint=${encodeURIComponent(DefaultEndpoint)}`
      const response = await fetch(fullUrl)
      const result = await response.json()
      return { endpointKey, result }
    })

    const studyEndpointURI = await Promise.all(requests)
    const detailResults = await Promise.all(
      studyEndpointURI.flatMap(({ endpointKey, result }) => {
        if (!result || !Array.isArray(result.results)) return []
        return result.results.slice(0, 3).map(async (item: { uri: string }) => {
          const recordId = item.uri.split('/').pop()
          const detailEndpoint = `ENDPOINT_STUDY_RECORD.${endpointKey}/${recordId}`
          const detailFullUrl = `${proxyURL}?endpoint=${encodeURIComponent(
            `dossier/${dossierId}/subject/document/${detailEndpoint}`,
          )}`
          const res = await fetch(detailFullUrl)
          return res.json().then(data => ({ endpointKey, data }))
        })
      }),
    )

    return detailResults
  } catch (error) {
    console.error('Error fetching study record:', error)
    throw error
  }
}
