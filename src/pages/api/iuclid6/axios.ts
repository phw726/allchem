import axios, { CreateAxiosDefaults } from 'axios'

const AXIOS_OPTIONS: CreateAxiosDefaults = {
  baseURL:
    process.env.NEXT_PUBLIC_IUCLID_API_ENDPOINT ||
    'http://localhost:8080/iuclid6-ext/api/ext/v1/', // 기본 IUCLID API URL
  withCredentials: true,
}

const axiosInstance = axios.create(AXIOS_OPTIONS)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const { status, data } = error.response || {}
    const errorMessage = data?.message || `Error: ${status}`
    console.error(`Axios Error: ${errorMessage}`)
    return Promise.reject(errorMessage)
  },
)

export default axiosInstance
