import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

export const Wrapper = styled.div`
  display: flex;
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  margin-right: 10px;

  position: relative;
  font-size: 20px;
  text-decoration: none;
  padding: 0;
  padding-left: 20px;
  margin-bottom: 1px;

  svg {
    width: 30px;
    height: 30px;
    color: #738491;

    &:hover {
      color: #22272b;
    }
  }
`

export const MenuWrapper = styled.div<{ open: boolean }>`
  overflow: hidden;
  position: fixed;
  width: 40%;
  min-width: 300px;
  max-width: 420px;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 9999px;
  z-index: 1000;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
`
export const MenuList = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  height: auto;
  border-top: 1px solid #f2f2f2;
  margin-top: 20px;
`

export const MenuItem = styled.div`
  position: relative;
  width: auto;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  font-family: 'Helvetica';
  font-size: 18px;
  font-weight: 600;
  color: #56a9ac;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  text-shadow: 0.5px 0.5px 0 lightgray;

  &:hover {
    z-index: 1;
    transition: all 0.4s;
    color: #fff;
    /* background-color: ; */
    background: linear-gradient(150deg, #539bd1 0%, #7dc9d1 100%);
    text-shadow: 1px 1px 1px gray;
    box-shadow: 4px 4px 2px lightgray;
    border-radius: 1px;
    border-bottom: none;
  }
`
export const MenuImg = styled(Image)`
  width: 100%;
  height: 40%;
  transform: scale(1.3) translateY(40px);
  position: sticky;
  bottom: 0;
  right: 0px;
  opacity: 0.2;
  z-index: -100;
`

export const Membership = styled(Link)`
  position: absolute;
  bottom: 100px;
  width: 100%;
  height: auto;
  margin: auto 0;
  left: 50%; /* 좌우 가운데 위치 */
  transform: translateX(-50%); /* 정확히 가운데로 이동 */
`
