// import axios from 'axios'
// import { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { searchWrd, searchCnd, numOfRows = 10, pageNo = 1 } = req.query

//   try {
//     const apiUrl = `https://msds.kosha.or.kr/openapi/service/msdschem/chemlist?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}&searchWrd=${encodeURIComponent(
//       searchWrd as string,
//     )}&searchCnd=${searchCnd}&numOfRows=${numOfRows}&pageNo=${pageNo}`

//     //msds.kosha.or.kr/openapi/service/msdschem/chemdetail11?serviceKey=[서비스키]&chemId=000001

//     https: const response = await axios.get(apiUrl)
//     res.setHeader('Cache-Control', 'no-store')
//     res.status(200).json(response.data)
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data from external API' })
//   }
// }

/// 1. 프록시 통합사용할 수 있도록 수정
/// 2. 3개의 물질정보 api 로직 및 커스텀 훅 작성

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { endpoint, ...query } = req.query

  if (!endpoint) {
    return res.status(400).json({ message: 'API path is required' })
  }

  try {
    // const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
    // const apiUrl = `${baseUrl}/${endpoint}?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}`

    // // QueryString 추가
    // const queryString = Object.entries(query)
    //   .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    //   .join('&')

    // const fullUrl = `${apiUrl}&${queryString}`

    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT // Base URL
    const apiUrl = `${baseUrl}/${endpoint}` // Full URL with endpoint

    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&')

    const fullUrl = `${apiUrl}?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}&${queryString}`

    console.log('apiUrl', apiUrl)
    console.log('fullUrl', fullUrl)
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
