/// 물질정보 api 3개 호출 ///

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { parseItemsByOrderIdx } from '../../xmlParser'
import {
  BASIC_INFO_PROPS,
  PHYSICAL_PROPS,
  TOXIC_PROPS,
} from '@/utils/chemDetailProperties'
import { mockBasicInfo, mockPhysicalProps, mockToxicProps } from '@/mockDB'

export const fetchChemData = async (
  endpoint: string,
  params: Record<string, any> = {},
) => {
  const response = await axios.get('/api/proxy', {
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
  const query = useQuery({
    queryKey: ['compoundData', chemId],

    // 목데이터 사용
    // queryFn: () => fetchMockData(chemId),
    queryFn: () => fetchAllData(chemId),

    select: data => {
      return {
        basicInfo: parseItemsByOrderIdx(data.basicInfo, BASIC_INFO_PROPS),
        physicalProps: parseItemsByOrderIdx(data.physicalProps, PHYSICAL_PROPS),
        toxicProps: parseItemsByOrderIdx(data.toxicProps, TOXIC_PROPS),
      }
    },
    enabled: !!chemId,
    retry: 1,
  })

  return {
    data: query.data || {
      basicInfo: [],
      physicalProps: [],
      toxicProps: [],
    },
    isLoading: query.isLoading,
    error: query.error,
  }
}
