'use client'

import * as S from './Header.styles'
import { useRouter } from 'next/router'
import Menu from '../Menu'
import { ILogo3 } from '../../../../public/image'
import { LuDot } from 'react-icons/lu'
import { css } from '@emotion/react'
import React, { useContext, useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useAuth } from '@/hooks/useAuth'
import { useSearchStore } from '@/state/searchState'
import SearchForm from '@/components/search/SearchForm/SearchForm'

export default function Header() {
  const { searchWrd, setSearchWrd } = useSearchStore()
  const router = useRouter()

  const handleSearch = (searchValue: string) => {
    setSearchWrd(searchValue)
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
        <SearchForm type="header" />
        <HeaderUtils />
        <Menu />
      </S.HeaderWrapper>
    </S.Wrapper>
  )
}

function HeaderUtils() {
  const router = useRouter()
  const [isLogIn, setIsLogIn] = useState(false)
  const auth = getAuth()
  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLogIn(!!user)
    })
    return () => unsubscribe()
  }, [auth])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  const isActive = (path: string) =>
    router.asPath.startsWith(path) ? 'active' : undefined

  return (
    <S.HeaderUtilWrapper>
      {!isLogIn ? (
        <S.HeaderUtilItems href="/login" className={isActive('/login')}>
          Sign In
        </S.HeaderUtilItems>
      ) : (
        <>
          <S.HeaderUtilItems href="/mypage" className={isActive('/mypage')}>
            {user?.displayName || user?.email || 'Verified User'}
          </S.HeaderUtilItems>
          <S.HeaderUtilButton as="button" onClick={handleLogout}>
            Log out
          </S.HeaderUtilButton>
        </>
      )}

      <LuDot css={DotStyle} />

      <S.HeaderUtilItems href="/likes">My Chem</S.HeaderUtilItems>
      <LuDot css={DotStyle} />
      <S.HeaderUtilItems href="/membership">Membership</S.HeaderUtilItems>
      <LuDot css={DotStyle} />

      <S.HeaderUtilItems href="/community">Community</S.HeaderUtilItems>
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
