import { useMemo } from 'react'

export const useGroupByLabel = (
  items: { label: string; itemDetail: string }[],
) => {
  const groupedItems = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const existing = acc.find(entry => entry.label === item.label)
        if (existing) {
          // 기존 label에 itemDetail 추가
          existing.itemDetail.push(item.itemDetail)
        } else {
          // 새로운 label 추가
          acc.push({ label: item.label, itemDetail: [item.itemDetail] })
        }
        return acc
      },
      [] as { label: string; itemDetail: string[] }[],
    )
  }, [items]) // items가 변경될 때만 재계산

  return groupedItems
}
