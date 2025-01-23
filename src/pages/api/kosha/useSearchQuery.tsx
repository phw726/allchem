import { XMLParser } from 'fast-xml-parser'
import axiosInstance from './axios'
import { AxiosError } from 'axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchChemData } from './useCompoundData'

interface LoadDataListProps {
  searchWrd: string
  searchCnd: number
  numOfRows?: number
  pageNo?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

// 데이터를 가져오는 함수
const loadDataList = async ({
  searchWrd,
  searchCnd,
  numOfRows = 10,
  pageNo = 1,
}: LoadDataListProps) => {
  try {
    const queryParams = {
      searchWrd,
      searchCnd,
      numOfRows,
      pageNo,
    }
    const data = await fetchChemData('chemlist', queryParams)

    // XML 파싱
    // const parser = new XMLParser()
    // const jsonData = parser.parse(data)
    const totalCount = data.response.body.totalCount || 0
    const items = data.response.body.items?.item || []

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

export default function useSearchQuery({
  searchWrd,
  searchCnd,
  pageNo = 1,
  numOfRows = 10,
  refetchOnWindowFocus = true,
  enabled,
}: LoadDataListProps) {
  return useQuery({
    queryKey: ['searchData', searchWrd, searchCnd, pageNo],
    queryFn: () =>
      loadDataList({
        searchWrd,
        searchCnd,
        pageNo,
        numOfRows,
      }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    enabled,
    initialData: { totalCount: 0, itemList: [] },
  })
}
