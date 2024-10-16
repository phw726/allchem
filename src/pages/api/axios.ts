import axios, { CreateAxiosDefaults } from 'axios'

const AXIOS_OPTIONS: CreateAxiosDefaults = {
  withCredentials: true,
  baseURL: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
}

const axiosInstance = axios.create(AXIOS_OPTIONS)

const errorHandlers: Record<number, Record<string, string>> = {
  1: {
    'APPLICATION ERROR': 'Application error occurred',
  },
  4: {
    HTTP_ERROR: 'HTTP error occurred',
  },
  12: {
    NO_OPENAPI_SERVICE_ERROR: 'OpenAPI service error',
  },
  20: {
    SERVICE_ACCESS_DENIED_ERROR: 'Access denied',
  },
  22: {
    LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR: 'Request limit exceeded',
  },
  30: {
    SERVICE_KEY_IS_NOT_REGISTERED_ERROR: 'Service key not registered',
  },
  31: {
    DEADLINE_HAS_EXPIRED_ERROR: 'Service deadline expired',
  },
  32: {
    UNREGISTERED_IP_ERROR: 'IP address not registered',
  },
  99: {
    UNKNOWN_ERROR: 'Unknown error occurred',
  },
}
axiosInstance.interceptors.response.use(
  // config => {
  //   const token = localStorage.getItem('accessToken')
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`
  //   }
  //   return config
  // },

  response => response,
  error => {
    const { status } = error.response || {}
    const { message } = error.response?.data || {}
    const errorMessage = errorHandlers[status]?.[message] || 'Unknown error'

    console.error(`Error: ${errorMessage}`)

    // 에러가 존재하면 반환
    return Promise.reject(errorMessage ? new Error(errorMessage) : error)
  },
)
export default axiosInstance

// export interface LoadDataListProps {
//   searchWrd: string
//   searchCnd: number
//   numOfRows?: number
//   pageNo?: number
// }

// export const loadDataList = async ({
//   searchWrd,
//   searchCnd,
//   numOfRows = 10,
//   pageNo = 1,
// }: LoadDataListProps) => {
//   try {

//     const url = `/chemlist?serviceKey=${API_KEY}&searchWrd=${encodeURIComponent(searchWrd)}&searchCnd=${searchCnd}&numOfRows=${numOfRows}&pageNo=${pageNo}`

//     const { data } = await axios.get(url, AXIOS_OPTIONS)

//     // XML 파싱
//     const parser = new XMLParser()
//     const jsonData = parser.parse(data)

//     // totalCount와 items 추출
//     const totalCount = jsonData.response.body.totalCount || 0

//     // items 배열 추출 (item이 한 개일 때는 객체로 반환되므로 배열로 처리)
//     const items = jsonData.response.body.items?.item || []
//     const itemList = Array.isArray(items) ? items : [items]

//     return { totalCount, itemList }
//   } catch (error) {
//     console.error('API 요청 중 오류 발생:', error)
//     throw new Error(`API 요청 실패: ${error}`)
//   }
// }
