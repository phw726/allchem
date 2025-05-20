import * as S from './ListHeader.styles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SearchForm from '@/components/search/SearchForm'
import Spacing from '@/components/common/Spacing'

interface ListHeaderProps {
  pageTitle: string | React.ReactElement
  renderType: 'compound' | 'post' // 렌더링 방식
}

export default function ListHeader({ renderType, pageTitle }: ListHeaderProps) {
  return (
    <S.Wrapper>
      <S.MenuText>
        {renderType === 'compound' && pageTitle ? (
          <>
            <S.MenuSubText>Compound Summary</S.MenuSubText>
            <Spacing size={0} />
            {pageTitle}
          </>
        ) : (
          `${pageTitle}`
        )}
      </S.MenuText>
    </S.Wrapper>
  )
}
