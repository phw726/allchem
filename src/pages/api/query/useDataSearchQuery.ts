// import { useQuery } from 'react-query'
// import { loadDataList, LoadDataListProps } from '../axios'

// // 데이터 리스트 요청 훅
// export default function useDataListQuery({
//   searchWrd,
//   searchCnd,
//   pageNo,
//   numOfRows = 10,
// }: LoadDataListProps) {
//   return useQuery(
//     ['dataList', searchWrd, searchCnd, pageNo],
//     () =>
//       loadDataList({
//         searchWrd,
//         searchCnd,
//         numOfRows,
//         pageNo,
//       }),
//     {
//       keepPreviousData: true, // 페이지 변경 시 이전 데이터를 유지
//       select: data => ({
//         totalCount: data.totalCount, // 전체 항목 수 반환
//         items: data.itemList, // items 반환
//       }),
//     },
//   )
// }

import { XMLParser } from 'fast-xml-parser'
import axiosInstance from '../axios'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

export interface LoadDataListProps {
  searchWrd: string
  searchCnd: number
  numOfRows?: number
  pageNo?: number
  refetchOnWindowFocus?: boolean
}

// 데이터를 가져오는 함수
const loadDataList = async ({
  searchWrd,
  searchCnd,
  numOfRows = 10,
  pageNo = 1,
}: LoadDataListProps) => {
  const url = `?searchWrd=${encodeURIComponent(searchWrd)}&searchCnd=${searchCnd}&numOfRows=${numOfRows}&pageNo=${pageNo}`

  try {
    // Axios 인스턴스를 사용하여 API 호출
    const { data } = await axiosInstance.get(url)

    // XML 파싱
    const parser = new XMLParser()
    const jsonData = parser.parse(data)

    console.log('파싱된 데이터:', jsonData) // XML 데이터를 JSON으로 변환한 결과를 확인

    const totalCount = jsonData.response.body.totalCount || 0
    const items = jsonData.response.body.items?.item || []

    const itemList = Array.isArray(items) ? items : [items]

    return { totalCount, itemList }
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      // 서버에서 응답을 받은 경우
      console.error('응답 상태 코드:', axiosError.response.status) // 상태 코드
      console.error('응답 데이터:', axiosError.response.data) // 서버 응답 데이터
    } else if (axiosError.request) {
      // 요청은 만들어졌지만 서버로부터 응답을 받지 못한 경우
      console.error('서버 응답 없음. 요청 데이터:', axiosError.request)
    } else {
      // 요청을 설정하는 동안 발생한 에러
      console.error('요청 설정 중 오류 발생:', axiosError.message)
    }

    throw new Error(`API 요청 실패: ${axiosError.message || 'Unknown error'}`)
  }
}

export default function useDataListQuery({
  searchWrd,
  searchCnd,
  pageNo = 1,
  numOfRows = 10,
  refetchOnWindowFocus = true,
}: LoadDataListProps) {
  return useQuery(
    ['dataList', searchWrd, searchCnd, pageNo],
    () =>
      loadDataList({
        searchWrd,
        searchCnd,
        pageNo,
        numOfRows,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus,

      initialData: {
        totalCount: 0, // 초기값 설정
        itemList: [], // 초기값 설정
      },
    },
  )
}
