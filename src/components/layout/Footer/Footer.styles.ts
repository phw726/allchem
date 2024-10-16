import styled from '@emotion/styled'
import Image from 'next/image'
import { LogoText } from '../Header/Header.styles'

export const Wrapper = styled.div`
  flex-direction: column;
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  bottom: 0px;
  margin-top: 20px;
  z-index: 1;
  background-color: #fff;
`

export const FooterImg = styled(Image)`
  z-index: -1;
  width: 100%;
  height: auto;
  position: relative;
  opacity: 0.1;
`

export const Content = styled.div`
  display: flex;
  width: 100%;

  /* @media (max-width: 1199px) {
    padding: 50px 34px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 40px 20px 30px;
  } */
`

// FooterMenu Component Styles

export const FooterMenu = styled.div`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #d4dce5;
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;

  /* @media (max-width: 1199px) {
  }

  @media (max-width: 767px) {
    height: unset;
    padding: 18px 20px;
  } */
`

export const FooterMenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-left: 20px;
  margin-right: 20px;
  /* 
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  } */
`

export const LeftMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 31px;
  font-family: Pretendard;
  font-size: 16px;
  transition: 0.15s color;

  a {
    color: #22272b;
    text-decoration: none;
  }

  a:hover {
    color: #56a9ac;
  }

  /* @media (max-width: 1199px) {
    gap: 16px;
    font-size: 14px;
  } */
`

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 20px;
`

export const Community = styled.a`
  width: 18px;
  height: 18px;

  path {
    fill: #687481;
  }

  &:hover {
    path {
      fill: #56a9ac;
    }
  }
`

export const Logo = styled.div`
  position: relative;
  width: 143.6px;
  height: 30.8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 300;
`

export const FooterLogoText = styled(LogoText)`
  display: flex;
  margin: 0;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  cursor: default;
`

export const Service = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 20px;
`

export const Description = styled.div`
  margin-top: 25px;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 1.61;
  color: #8995a1;
  margin-bottom: 10px;
  width: 100%;
  max-width: 70%;
`

export const Copyright = styled.div`
  margin-top: 30px;
  font-family: Pretendard;
  font-size: 14px;
  color: #22272b;
  /* margin-bottom: 50px;

  @media (max-width: 767px) {
    margin-top: 20px;
  } */
`
