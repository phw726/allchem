import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

/* #FDFEFF */
/*  #fdfeff; */

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* max-width: 1199px; */
  height: 80px;
  background-color: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  box-shadow: 0px 1px 1px rgba(235, 236, 237, 1);
  transition: all 0.3s;
  /* max-width: 1199px; */
  /* border-bottom: 1px solid #f2f2f2; */
`

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 4px;
  margin: 0 30px 0 20px;
  width: auto;
  height: auto;
  position: relative;
  gap: 10px;

  img {
    transition: 0.3s all;
  }
`

export const LogoIcon = styled(Image)`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  opacity: 0.1;
`

export const LogoText = styled.div`
  position: relative;
  display: block;
  font-size: 25px;
  text-decoration: none;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: #56a9ac;
`

export const HeaderWrapper = styled.div`
  display: flex;
  width: auto;
`
export const HeaderUtilWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: darkgray;
  font-size: 12px;
  margin-right: 10px;
  flex-shrink: 0;
`

export const HeaderUtilItems = styled(Link)`
  width: auto;
  height: auto;
  margin: auto 0;
  color: gray;
  font-weight: 500;
  display: flex;

  &:hover {
    color: #22272b;
  }
`

export const HeaderMedia = styled.div`
  display: flex;
  height: auto;
  text-align: center;
  align-items: center;
  margin-left: 10px;

  @media (max-width: 750px) {
    display: none;
  }
`

export const HeaderUtilButton = styled.button`
  display: flex;
  width: auto;
  height: auto;
  margin-left: -5px;
  padding: 2px 4px;
  font-weight: 400;
  font-size: 12px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: transparent;
  color: gray;
  text-align: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #22272b;
    border-color: #22272b;
  }
`
