import React, { useState } from 'react'
import * as S from './Introduction.styles'
import Image from 'next/image'
import { MainImg4 } from '../../../../public/image'
import AniText from '@/components/common/Buttons/aniText'
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import SearchForm from '@/components/search/SearchForm'

const FontRoboto = Roboto({
  weight: ['400', '700'], // 사용할 글꼴의 굵기 설정
  subsets: ['latin'], // 필요한 글꼴 서브셋 설정
})

export default function Introduction() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = (searchValue: string) => {
    if (!searchValue.trim()) {
      router.push('/search')
    } else {
      router.push(`/search?keyword=${searchValue}`)
    }
  }

  return (
    <S.Wrapper>
      <S.BackgroundImage>
        <Image
          src={MainImg4}
          alt="Background Image"
          fill
          priority={true}
          style={{ objectFit: 'cover' }}
        />
      </S.BackgroundImage>
      <IntroText />
      <S.IntroWrapper>
        <SearchForm
          type="main"
          onSearch={handleSearch}
          customButton={
            <S.SearchButton onClick={() => handleSearch(searchValue)}>
              <AniText>GO &nbsp; SEARCH &nbsp;&gt;</AniText>
            </S.SearchButton>
          }
        />
      </S.IntroWrapper>
    </S.Wrapper>
  )
}

function IntroText() {
  return (
    <S.IntroText>
      <S.MainText className={FontRoboto.className}>
        <span>Compare chemical information </span>
        at a glance, <br />
        simplifying your research and choices
      </S.MainText>
      <S.SubText className={FontRoboto.className}>
        Fast, Reliable Chemical Search and Comparison
      </S.SubText>
    </S.IntroText>
  )
}
