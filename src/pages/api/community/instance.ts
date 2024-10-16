import axios from 'axios'

export const baseAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  // baseURL: "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
