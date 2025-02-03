import React from 'react'
import * as S from './ListContent.styles'

interface ListContentProps {
  data?: { label?: string; itemDetail?: string[] | string }[]
}

interface PropertyItemProps {
  label?: string
  value?: string | number
}

export default function ListContent({ data }: ListContentProps) {
  return (
    <S.Wrapper>
      {data?.map((item, index) => (
        <PropertyItem
          key={index}
          label={item?.label}
          value={
            Array.isArray(item?.itemDetail)
              ? item?.itemDetail
                  .filter(detail => detail && detail.trim() !== '')
                  .map(detail => `• ${detail}`) // 기호 추가
                  .join('<br />') // 쉼표로 연결
              : item?.itemDetail
          }
        />
      ))}
    </S.Wrapper>
  )
}
export function PropertyItem({ label, value }: PropertyItemProps) {
  if (!value) return null

  return (
    <S.ItemWrapper>
      <S.LabelText>{label}</S.LabelText>{' '}
      <S.ItemText dangerouslySetInnerHTML={{ __html: String(value) }} />
    </S.ItemWrapper>
  )
}
