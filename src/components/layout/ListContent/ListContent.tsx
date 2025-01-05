import React from 'react'
import * as S from './ListContent.styles'

interface ListContentProps {
  data: { label: string; itemDetail: string }[]
}

interface PropertyItemProps {
  label: string
  value?: string | number
}

export default function ListContent({ data }: ListContentProps) {
  return (
    <S.Wrapper>
      {data.map((item, index) => (
        <PropertyItem key={index} label={item.label} value={item.itemDetail} />
      ))}
    </S.Wrapper>
  )
}

export function PropertyItem({ label, value }: PropertyItemProps) {
  if (!value) return null

  return (
    <S.ItemWrapper>
      <S.LabelText>{label}</S.LabelText> <S.ItemText>{value}</S.ItemText>
    </S.ItemWrapper>
  )
}
