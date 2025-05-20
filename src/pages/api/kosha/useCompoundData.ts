/// 물질정보 api 3개 호출 ///

import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { parseItemsByOrderIdx } from '../xmlParser'
import {
  BASIC_INFO_PROPS,
  PHYSICAL_PROPS,
  TOXIC_PROPS,
} from '@/utils/chemDetailProperties'
import { mockBasicInfo, mockPhysicalProps, mockToxicProps } from '@/data/mockDB'

export const fetchChemData = async (
  endpoint: string,
  params: Record<string, any> = {},
) => {
  const response = await axios.get('/api/kosha/proxy', {
    params: { endpoint, ...params },
  })

  const parser = new XMLParser()

  return parser.parse(response.data)
}

const fetchBasicInfo = (chemId: string) =>
  fetchChemData('chemdetail03', { chemId })

const fetchPhysicalProps = (chemId: string) =>
  fetchChemData('chemdetail09', { chemId })

const fetchToxicProps = (chemId: string) =>
  fetchChemData('chemdetail11', { chemId })

const fetchAllData = async (chemId: string) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    isArray: tagName => ['item'].includes(tagName), // item을 항상 배열로 처리
  })

  try {
    const [basicInfo, physicalProps, toxicProps] = await Promise.all([
      fetchBasicInfo(chemId),
      fetchPhysicalProps(chemId),
      fetchToxicProps(chemId),
    ])
    return { basicInfo, physicalProps, toxicProps }
  } catch (error) {
    console.error('Failed to fetch or parse data:', error)
    return { basicInfo: null, physicalProps: null, toxicProps: null }
  }
}

const fetchMockData = async (chemId: string) => {
  return {
    basicInfo: mockBasicInfo,
    physicalProps: mockPhysicalProps,
    toxicProps: mockToxicProps,
  }
}
export const useCompoundData = (chemId: string) => {
  // ✅ 1. 먼저 `basicInfo` 실행 (가장 중요하고 먼저 로딩되어야 하는 데이터)
  const basicInfoQuery = useQuery({
    queryKey: ['basicInfo', chemId],
    queryFn: () => fetchBasicInfo(chemId),
    enabled: !!chemId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  })

  const physicalPropsQuery = useQuery({
    queryKey: ['physicalProps', chemId],
    queryFn: () => fetchPhysicalProps(chemId),
    enabled: !!chemId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  })

  const toxicPropsQuery = useQuery({
    queryKey: ['toxicProps', chemId],
    queryFn: () => fetchToxicProps(chemId),
    enabled: !!chemId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  })

  return {
    data: {
      basicInfo:
        parseItemsByOrderIdx(basicInfoQuery.data, BASIC_INFO_PROPS) || [],
      physicalProps:
        parseItemsByOrderIdx(physicalPropsQuery.data, PHYSICAL_PROPS) || [],
      toxicProps: parseItemsByOrderIdx(toxicPropsQuery.data, TOXIC_PROPS) || [],
    },
    isLoadingBasicInfo: basicInfoQuery.isLoading,
    isLoadingPhysicalProps: physicalPropsQuery.isLoading,
    isLoadingToxicProps: toxicPropsQuery.isLoading,
    error:
      basicInfoQuery.error || physicalPropsQuery.error || toxicPropsQuery.error,
  }
}

// export const useCompoundData = (chemId: string) => {
//   const query = useQuery({
//     queryKey: ['compoundData', chemId],

//     // 목데이터 사용
//     // queryFn: () => fetchMockData(chemId),
//     queryFn: () => fetchAllData(chemId),

//     select: data => {
//       return {
//         basicInfo: parseItemsByOrderIdx(data.basicInfo, BASIC_INFO_PROPS),
//         physicalProps: parseItemsByOrderIdx(data.physicalProps, PHYSICAL_PROPS),
//         toxicProps: parseItemsByOrderIdx(data.toxicProps, TOXIC_PROPS),
//       }
//     },
//     enabled: !!chemId,
//     retry: 1,
//   })

//   return {
//     data: query.data || {
//       basicInfo: [],
//       physicalProps: [],
//       toxicProps: [],
//     },
//     isLoadingBasicInfo: query.data.basicInfo.isLoading,
//     isLoadingPhysicalProps: physicalPropsQuery.isLoading,
//     isLoadingToxicProps: toxicPropsQuery.isLoading,
//     error: query.error,
//   }
// }
