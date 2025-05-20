import React from 'react'
import * as S from './ListContent.styles'
import Skeleton from 'react-loading-skeleton'

interface ListContentProps {
  data?: { label?: string; itemDetail?: string[] | string }[]
  isLoading?: boolean
}

interface PropertyItemProps {
  label?: string
  value?: string | number
  isLoading?: boolean
}

export default function ListContent({ data, isLoading }: ListContentProps) {
  if (isLoading) {
    return (
      <S.Wrapper>
        {[...Array(5)].map((_, index) => (
          <S.ItemWrapper key={index}>
            <S.LabelText>
              <Skeleton width={80} />
            </S.LabelText>
            <S.ItemText>
              <Skeleton width={150} />
            </S.ItemText>
          </S.ItemWrapper>
        ))}
      </S.Wrapper>
    )
  }
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
export function PropertyItem({ label, value, isLoading }: PropertyItemProps) {
  if (!value) return null

  return (
    <S.ItemWrapper>
      <S.LabelText>{label}</S.LabelText>{' '}
      <S.ItemText dangerouslySetInnerHTML={{ __html: String(value) }} />
    </S.ItemWrapper>
  )
}
