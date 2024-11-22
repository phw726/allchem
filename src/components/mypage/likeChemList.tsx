import React from 'react'
import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'

export default function LikeChemList() {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>MY CHEM</S.Title>
        <S.More href="/mychem">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>
    </S.Wrapper>
  )
}
