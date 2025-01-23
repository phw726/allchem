// import axios from 'axios'
// import { ENDPOINT_STUDY_RECORDS } from './endpoint'
// import { StudyRecordResponse } from '@/utils/types'
// import { useCallback, useEffect, useState } from 'react'

// const proxyURL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/proxy'

// interface StudyRecordUriItem {
//   uri: string
// }

// interface CompoundProps {
//   dossierId: string
//   studyType: keyof typeof ENDPOINT_STUDY_RECORDS
// }

// export const useIUCLIDCompound = ({ dossierId, studyType }: CompoundProps) => {
//   const [data, setData] = useState<StudyRecordResponse | null>(null)

//   const fetchData = useCallback(async () => {
//     try {
//       const result = await fetchStudyRecord(dossierId, studyType)
//       setData(result)
//     } catch (error) {
//       console.error('Failed to fetch study record:', error)
//     }
//   }, [dossierId, studyType])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   return { data, refetch: fetchData }
// }

// ///// 특정 물질 endpoint의 dossier uri 리스트 홏출출
// const fetchStudyRecordUriList = async (
//   dossierId: string,
//   studyType: keyof typeof ENDPOINT_STUDY_RECORDS,
// ): Promise<StudyRecordUriItem[]> => {
//   const endpoint = `iuclid6-ext/api/ext/v1/dossier/${dossierId}/subject/document/${ENDPOINT_STUDY_RECORDS[studyType]}`
//   const url = `${proxyURL}?endpoint=${endpoint}`
//   const response = await axios.get(url)

//   return response.data.results.map((item: { uri: string }) => ({
//     uri: item.uri,
//   }))
// }

// ///// 응답온 dossier url을 추가하여 api를 보내 uri별 데이터 요청청
// const fetchStudyRecordUri = async (uri: string) => {
//   const endpoint = uri.replace('iuclid6:/', '/iuclid6-ext/api/ext/v1/')
//   const url = `${proxyURL}?endpoint=${endpoint}`

//   const response = await axios.get(url)
//   return response.data
// }

// ///// 상세 데이터 가져오기
// const fetchStudyRecord = async (
//   dossierId: string,
//   studyType: keyof typeof ENDPOINT_STUDY_RECORDS,
// ): Promise<StudyRecordResponse> => {
//   try {
//     const uriList = await fetchStudyRecordUriList(dossierId, studyType)
//     const requests = uriList.map(item => fetchStudyRecordUri(item.uri))
//     const results = await Promise.all(requests)

//     return results
//   } catch (error) {
//     console.error('Error fetching study records:', error)
//     throw error
//   }
// }

// import axios from 'axios'
// import { ENDPOINT_STUDY_RECORDS } from './endpoint'
// import { StudyRecordResponse } from '@/utils/types'
// import { useCallback, useEffect, useState } from 'react'

// const proxyURL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/proxy'

// interface StudyRecordUriItem {
//   uri: string
// }

// interface CompoundProps {
//   dossierId: string
//   studyType: keyof typeof ENDPOINT_STUDY_RECORDS
// }

// export const useIUCLIDCompound = ({ dossierId, studyType }: CompoundProps) => {
//   const [data, setData] = useState<StudyRecordResponse | null>(null)

//   const fetchData = useCallback(async () => {
//     try {
//       const result = await fetchStudyRecord(dossierId, studyType)
//       setData(result)
//     } catch (error) {
//       console.error('Failed to fetch study record:', error)
//     }
//   }, [dossierId, studyType])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   return { data, refetch: fetchData }
// }

// ///// 특정 물질 endpoint의 dossier uri 리스트 호출
// const fetchStudyRecordUriList = async (
//   dossierId: string,
//   studyType: keyof typeof ENDPOINT_STUDY_RECORDS,
// ): Promise<StudyRecordUriItem[]> => {
//   const endpoint = `iuclid6-ext/api/ext/v1/dossier/${dossierId}/subject/document/${ENDPOINT_STUDY_RECORDS[studyType]}`
//   // const url = `${proxyURL}?endpoint=${endpoint}`
//   const url = `${proxyURL}?endpoint=${encodeURIComponent(endpoint)}`

//   console.log('fetchStudyRecordUriList', url)
//   try {
//     const response = await axios.get(url)
//     const results = response.data?.results

//     if (!results || !Array.isArray(results)) {
//       console.warn('No results found for the given endpoint:', endpoint)
//       return []
//     }

//     return results.map((item: { uri: string }) => ({
//       uri: item.uri,
//     }))
//   } catch (error) {
//     console.error('Error fetching URI list:', error)
//     throw error
//   }
// }

// ///// 응답된 dossier URL을 추가하여 API를 보내 URI별 데이터 요청
// const fetchStudyRecordUri = async (uri: string) => {
//   const endpoint = uri.replace('iuclid6:/', '/iuclid6-ext/api/ext/v1/')
//   const url = `${proxyURL}?endpoint=${endpoint}`

//   console.log('fetchStudyRecordUri', url)

//   try {
//     const response = await axios.get(url)
//     return response.data
//   } catch (error) {
//     console.error('Error fetching study record by URI:', error)
//     throw error
//   }
// }

// ///// 상세 데이터 가져오기
// const fetchStudyRecord = async (
//   dossierId: string,
//   studyType: keyof typeof ENDPOINT_STUDY_RECORDS,
// ): Promise<StudyRecordResponse> => {
//   try {
//     const uriList = await fetchStudyRecordUriList(dossierId, studyType)

//     if (uriList.length === 0) {
//       console.warn('No URIs found for the given dossier and study type.')
//       return []
//     }

//     const requests = uriList.map(item => fetchStudyRecordUri(item.uri))
//     const results = await Promise.all(requests)

//     return results
//   } catch (error) {
//     console.error('Error fetching study records:', error)
//     throw error
//   }
// }

import axios from 'axios'
import { ENDPOINT_STUDY_RECORDS } from './endpoint'
import { StudyRecordResponse } from '@/utils/types'
import { useCallback, useEffect, useState } from 'react'

const proxyURL = process.env.NEXT_PUBLIC_IUCLID_BASE_URL

interface CompoundProps {
  dossierId: string
  studyType: string
  // studyType: keyof typeof ENDPOINT_STUDY_RECORDS
}

// URI 리스트 호출
const fetchStudyRecord = async (
  dossierId: string,
  studyType: string,
): Promise<string[]> => {
  const endpoint = `dossier/${dossierId}/subject/document/${studyType}`
  // const endpoint = `dossier/7d2fc287-88f7-49b3-87a2-258c60a3d6ca/subject/document/ENDPOINT_STUDY_RECORD.Ph`
  const fullUrl = `${proxyURL}?endpoint=${endpoint}`

  console.log('iuclid fetchStudyRecordUriLis URL', fullUrl)

  try {
    //// 1. uri 리스트 가져오기기
    const response = await fetch(fullUrl)
    const data = await response.json()

    if (!data.results || !Array.isArray(data.results)) {
      console.warn('No results found for the given endpoint:', endpoint)
      return []
    }

    //// 2. recodeId(endpoint uri 추출출)

    const uriList: string[] = data.results
      .map((item: { uri: string }) => {
        const recordId = item.uri.split('/').pop()
        return recordId && typeof recordId === 'string' ? recordId : null
      })
      .slice(0, 5)

    // 3. `endpointDataUri` 생성 및 API 요청

    const requests = uriList.map(recordId => {
      if (!recordId) return null // Record ID가 없는 경우 건너뜀
      const endpointDataUri = `${endpoint}/${recordId}`
      console.log('Endpoint Data URI:', endpointDataUri)

      return fetch(
        `${proxyURL}?endpoint=${encodeURIComponent(endpointDataUri)}`,
      )
    })
    const reponses = await Promise.all(requests)

    //// 4. JSON 변환
    const results = await Promise.all(
      reponses.map(res => {
        if (!res) {
          console.warn('Response is null')
          return null // Null 반환
        }
        return res.json()
      }),
    ).then(results => results.filter(result => result !== null)) // Null 제거

    return results
  } catch (error) {
    console.error('Error fetching study record:', error)
    throw error
  }
}

export const useIUCLIDCompound = ({ dossierId, studyType }: CompoundProps) => {
  const [data, setData] = useState<any[] | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchStudyRecord(dossierId, studyType)
      setData(result)
    } catch (error) {
      console.error('Failed to fetch study record:', error)
    }
  }, [dossierId, studyType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, refetch: fetchData }
}
