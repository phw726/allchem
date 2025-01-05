import axios, { CreateAxiosDefaults } from 'axios'

const AXIOS_OPTIONS: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
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
  response => response,
  error => {
    const { status } = error.response || {}
    const { message } = error.response?.data || {}
    const errorMessage = errorHandlers[status]?.[message] || 'Unknown error'

    console.error(`Error: ${errorMessage}`)

    return Promise.reject(errorMessage ? new Error(errorMessage) : error)
  },
)
export default axiosInstance
