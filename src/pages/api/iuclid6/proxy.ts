import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { endpoint, ...query } = req.query

  if (!endpoint) {
    return res.status(400).json({ message: 'Endpoint is required' })
  }

  if (!req.url) {
    return res.status(400).json({ message: 'Invalid request' })
  }

  // IUCLID API 기본 URL
  const baseUrl =
    process.env.NEXT_PUBLIC_IUCLID_API_ENDPOINT ||
    'http://localhost:8080/iuclid6-ext/api/ext/v1/'
  const fullUrl = `${baseUrl}${endpoint}`

  // IUCLID API 요청 헤더
  const headers = {
    'iuclid6-user': process.env.NEXT_PUBLIC_IUCLID_USER || '',
    'iuclid6-pass': process.env.NEXT_PUBLIC_IUCLID_PASS || '',
    Accept: 'application/vnd.iuclid6.ext+json;type=iuclid6.Document',
  }

  try {
    // IUCLID API로 요청 전달
    const response = await axios.get(fullUrl, { headers })

    // IUCLID 응답 전달
    res.status(200).json(response.data)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader
  } catch (error: any) {
    console.error('Proxy error:', error.message)

    if (error.response) {
      console.error('Error Response Status:', error.response.status)
      console.error('Error Response Data:', error.response.data)
    }
    res.status(500).json({
      message: 'Error fetching data from IUCLID API',
      error: error.message,
    })
  }
}
