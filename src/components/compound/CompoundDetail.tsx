import * as S from './CompoundDetail.styles'
import ListContent from '../layout/ListContent'

export interface CompoundData {
  basicInfo: { label: string; itemDetail: string }[]
  physicalProps: { label: string; itemDetail: string }[]
  toxicProps: { label: string; itemDetail: string }[]
}

export default function CompoundDetailForm({
  compoundData,
}: {
  compoundData: CompoundData
}) {
  return (
    <S.Wrapper>
      {compoundData && (
        <>
          <S.ContentTitle>1. Names and Identifiers</S.ContentTitle>
          <ListContent data={compoundData.basicInfo} />
          <S.ContentTitle>2. Chemical and Physical Properties</S.ContentTitle>
          <ListContent data={compoundData.physicalProps} />
          <S.ContentTitle>3. Toxicity</S.ContentTitle>
          <ListContent data={compoundData.toxicProps} />
        </>
      )}
    </S.Wrapper>
  )
}

// function parseChemicalData(apiData: any): ChemicalData {
//   const properties = apiData.body.items.map((item: any) => ({
//     name: item.msdsItemNameKor,
//     value: item.itemDetail?.trim() || 'No Data',
//   }))

//   return {
//     id: 'api-chemical-1', // 예제 ID
//     properties,
//   }
// }

// export function ChemicalPhysicalProperties() {
//   const [data, setData] = useState<ChemicalData | null>(mockChemDB)

//   useEffect(() => {
//     // API 호출
//     const fetchData = async () => {
//       try {
//         const response = await fetch('API_ENDPOINT') // API URL
//         const apiData = await response.json()
//         const parsedData = parseChemicalData(apiData)
//         setData(parsedData)
//       } catch (error) {
//         console.error('Failed to fetch data:', error)
//       }
//     }
//     fetchData()
//   }, [])

//   if (!data) return <div>Loading...</div>

//   return (
//     <div>
//       <h1>Chemical Details</h1>
//       {data.properties.map((property, index) => (
//         <PropertyItem
//           key={index}
//           label={property.name}
//           value={property.value}
//         />
//       ))}
//     </div>
//   )
// }
