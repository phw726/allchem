// import { NextApiRequest, NextApiResponse } from 'next'
// import axios from 'axios'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { searchWrd, searchCnd, numOfRows = 10, pageNo = 1 } = req.query

//   const url = `https://msds.kosha.or.kr/openapi/service/msdschem/chemlist?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}&searchWrd=${encodeURIComponent(
//     searchWrd as string,
//   )}&searchCnd=${searchCnd}&numOfRows=${numOfRows}&pageNo=${pageNo}`

//   try {
//     const { data } = await axios.get(url)
//     res.status(200).json(data)
//   } catch (error) {
//     res.status(500).json({ message: 'API 요청 중 오류 발생', error })
//   }
// }

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { searchWrd, searchCnd, numOfRows = 10, pageNo = 1 } = req.query

  try {
    const apiUrl = `https://msds.kosha.or.kr/openapi/service/msdschem/chemlist?serviceKey=${process.env.NEXT_PUBLIC_CHEM_DATA_API}&searchWrd=${encodeURIComponent(
      searchWrd as string,
    )}&searchCnd=${searchCnd}&numOfRows=${numOfRows}&pageNo=${pageNo}`

    const response = await axios.get(apiUrl)

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from external API' })
  }
}
