import { XMLParser } from 'fast-xml-parser'

interface ParseItem {
  ordrIdx: number
  msdsItemNameKor: string
  itemDetail: string
  label: string
  key: string
}

export function parseItemsByOrderIdx(
  data: any,
  props: { ordrIdx: number; label: string; key: string }[],
): ParseItem[] {
  const items = data?.response?.body?.items?.item

  if (!items || !Array.isArray(items)) {
    console.error('Invalid Items')
    return []
  }

  return props.map(({ ordrIdx, label, key }) => {
    const findItem = items.find((item: any) => Number(item.ordrIdx) === ordrIdx)
    return {
      ordrIdx,
      label,
      key,
      msdsItemNameKor: findItem?.msdsItemNameKor || 'N/A',
      itemDetail: findItem?.itemDetail || 'N/A',
    }
  })
}

// export function useParseDataLoad(data: string, orderIdxList: number[]) {
//   return useMemo(
//     () => parseItemsByOrderIdx(data, orderIdxList),
//     [data, orderIdxList],
//   )
// }
