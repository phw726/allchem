// import axios from 'axios'
// import { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { endpoint, ...query } = req.query

//   if (!endpoint) {
//     return res.status(400).json({ message: 'API path is required' })
//   }

//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT // Base URL
//     const apiUrl = `${baseUrl}/${endpoint}` // Full URL with endpoint

//     const queryString = Object.entries(query)
//       .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
//       .join('&')

//     const fullUrl = `${apiUrl}?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}&${queryString}`

//     console.log('apiUrl', apiUrl)
//     console.log('fullUrl', fullUrl)
//     const response = await axios.get(fullUrl)

//     res.setHeader('Cache-Control', 'no-store')
//     res.status(200).json(response.data)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Content-Type', 'application/json')
//     res.status(200).send(response.data)
//   } catch (error: any) {
//     console.error('Error in Proxy:', error.message)
//     res.status(500).json({ message: 'Error fetching data from external API' })
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { endpoint, ...query } = req.query

  if (!endpoint) {
    return res.status(400).json({ message: 'API path is required' })
  }

  try {
    const serviceKey = process.env.NEXT_PUBLIC_CHEM_KEY_API
    const baseUrl = process.env.NEXT_PUBLIC_API_KOSHA_ENDPOINT // KOSHA Base URL
    const apiUrl = `${baseUrl}/${endpoint}` // Full URL with endpoint

    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&')

    const fullUrl = `${apiUrl}?serviceKey=${serviceKey}&${queryString}`

    const response = await axios.get(fullUrl)

    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(response.data)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(response.data)
  } catch (error: any) {
    console.error('Error in Proxy:', error.message)
    res.status(500).json({ message: 'Error fetching data from external API' })
  }
}

// // import axios from 'axios'
// // import { NextApiRequest, NextApiResponse } from 'next'

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse,
// // ) {
// //   const { endpoint, ...query } = req.query

// //   console.log('Received Request:')
// //   console.log('Endpoint:', endpoint)
// //   console.log('Query:', query)

// //   if (!endpoint) {
// //     return res.status(400).json({ message: 'API path is required' })
// //   }

// //   try {
// //     let fullUrl = ''
// //     const headers: Record<string, string> = {}

// //     // IUCLID 요청인지 확인
// //     if (endpoint.toString().startsWith('/api/iuclid6')) {
// //       console.log('IUCLID Proxy Logic Executing...')
// //       // http://localhost:3000/api/iuclid6
// //       const baseUrl =
// //         process.env.NEXT_PUBLIC_IUCLID_API_ENDPOINT || 'http://localhost:8080'
// //       const cleanEndpoint = endpoint.toString().replace('/api/iuclid6/', '') // '/api/iuclid6' 제거
// //       fullUrl = `${baseUrl}/iuclid6-ext/${cleanEndpoint}`
// //       // fullUrl = `${baseUrl}/${endpoint}` // IUCLID 서버 요청 URL

// //       // IUCLID 헤더 추가
// //       headers['iuclid6-user'] = process.env.NEXT_PUBLIC_IUCLID_USER || ''
// //       headers['iuclid6-pass'] = process.env.NEXT_PUBLIC_IUCLID_PASS || ''
// //       headers['Accept'] =
// //         'application/vnd.iuclid6.ext+json;type=iuclid6.Document'

// //       // Query 추가
// //       // const queryString = Object.entries(query)
// //       //   .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
// //       //   .join('&')
// //       // if (queryString) {
// //       //   fullUrl = `${fullUrl}?${queryString}`
// //       // }
// //     } else {
// //       // 기존 API 요청 처리 (변경 없음)
// //       const baseUrl =
// //         process.env.NEXT_PUBLIC_API_ENDPOINT ||
// //         'http://localhost:3000/api/proxy'
// //       const apiUrl = `${baseUrl}/${endpoint}`

// //       const queryString = Object.entries(query)
// //         .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
// //         .join('&')
// //       fullUrl = `${apiUrl}?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}&${queryString}`
// //     }

// //     console.log('Full URL:', fullUrl)
// //     console.log('Headers:', headers)
// //     // 요청 실행
// //     const response = await axios.get(fullUrl, { headers })

// //     res.setHeader('Cache-Control', 'no-store')
// //     res.setHeader('Access-Control-Allow-Origin', '*')
// //     res.setHeader('Access-Control-Allow-Credentials', 'true')
// //     res.setHeader('Content-Type', 'application/json')
// //     res.status(200).send(response.data)
// //   } catch (error: any) {
// //     console.error('Error in Proxy:', error.message)
// //     res.status(500).json({ message: 'Error fetching data from external API' })
// //   }
// // }
