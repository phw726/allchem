import React, { ReactNode } from 'react'
import * as S from './Layout.styles'
import Header from '../Header'
import Footer from '../Footer'

type LayoutProps = {
  children: ReactNode
  bgColor?: string
  isFooter?: boolean
}

function Layout({ children, bgColor, isFooter = true }: LayoutProps) {
  return (
    <S.Wrapper $bgColor={bgColor}>
      <Header />
      <S.Content>{children}</S.Content>
      {isFooter && <Footer />}
    </S.Wrapper>
  )
}

export default Layout
