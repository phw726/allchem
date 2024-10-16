'use client'

import * as S from './Header.styles'
import { useRouter } from 'next/router'
import Menu from '../Menu'
import { ILogo3 } from '../../../../public/image'
import { LuDot } from 'react-icons/lu'
import { css } from '@emotion/react'
import React from 'react'
import SearchForm from '@/components/search/SearchForm'

export default function Header() {
  const router = useRouter()

  const handleSearch = (searchValue: string) => {
    router.push(`/search?keyword=${searchValue}`)
  }

  return (
    <S.Wrapper>
      <S.Logo href="/">
        <S.LogoIcon
          src={ILogo3}
          alt="allchem logo"
          fill
          sizes="auto"
          priority={true}
        />
        <S.LogoText>ALLCHEM</S.LogoText>
      </S.Logo>
      <S.HeaderWrapper>
        <SearchForm type="header" onSearch={handleSearch} />
        <HeaderUtils />
        <Menu />
      </S.HeaderWrapper>
    </S.Wrapper>
  )
}

const HeaderItems = [
  { href: '/login', title: 'Sign In' },
  { href: '/likes', title: 'My Chem' },
  { href: '/membership', title: 'Membership' },
  { href: '/community', title: 'Community' },
]

function HeaderUtils() {
  const router = useRouter()
  const isActive = (path: string) =>
    router.asPath.startsWith(path) ? 'active' : undefined

  return (
    <S.HeaderUtilWrapper>
      {HeaderItems.map(({ href, title }, index) => (
        <React.Fragment key={href}>
          <S.HeaderUtilItems href={href} className={isActive(href)}>
            {title}
          </S.HeaderUtilItems>
          {index < HeaderItems.length - 1 && <LuDot css={DotStyle} />}
        </React.Fragment>
      ))}
    </S.HeaderUtilWrapper>
  )
}

const DotStyle = css`
  width: 10px; /* 크기 조정 */
  height: 10px; /* 높이 조정 */
  margin: 0 2px; /* 아이콘 좌우 여백 */
  font-size: 20px; /* 아이콘의 크기 */
  color: #bcbbbb; /* 색상 조정 */
`
