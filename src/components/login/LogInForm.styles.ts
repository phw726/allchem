import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { SearchButton } from '../search/SearchForm/SearchForm.styles'
import Image from 'next/image'

export const Wrapper = styled.form`
  display: grid;
  width: auto;
  height: auto;
  margin: 50px 20px 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-template-columns: repeat(2, 1fr);
`

export const BackgroundImage = styled(Image)`
  opacity: 0.4;
  width: 100%;
  height: auto;
  position: static;
  z-index: -10;
  margin-top: 110px;
  left: 0;
  bottom: 0;
  box-shadow: 10px 10px 999px rgba(0, 0, 0, 10);
`

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  gap: 20px;
  margin-top: 0;
  margin-bottom: auto;
`
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`

export const Input = styled.input`
  width: auto;
  max-width: 400px;
  min-width: 300px;
  display: flex;
  height: 30px;
  font-size: 14px;
  color: #22272b;
  border: 1px solid lightgray;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s;
  padding: 10px 0px 10px 50px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &::placeholder {
    color: lightgray;
  }

  &:focus {
    border: 2px solid royalblue;
  }
`

export const IconStyle = css`
  position: absolute;
  left: 35px;
  margin-top: 16px;
  z-index: 10;
  font-size: 20px;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const Button = styled(SearchButton)<{ $isActive?: boolean }>`
  width: auto;
  max-width: 444px;
  padding: 10px 20px;
  text-align: center;
  justify-content: center;
  ${({ $isActive }) => ($isActive ? `background : royalblue; color: #fff` : '')}
`

export const OAuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  /* height: auto; */
  margin-left: 50px;
  margin-right: auto;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  margin-bottom: auto;
`

export const Icon = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 4px;
  background-color: #eee;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  gap: 8px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #22272b;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
    background-color: #cfdeed;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
`

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 10px auto;
`

export const SignUpText = styled.span`
  font-size: 15px;
  color: #22272b;
  margin-bottom: 10px;
`

export const SignUpLink = styled(Link)`
  color: #22272b;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
    color: royalblue;
  }
`

export const ForgetPW = styled(Link)`
  color: #22272b;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;
  /* transition: all 0.5s; */

  &:hover {
    text-decoration: underline;
    color: royalblue;
  }
`

export const TermsOfService = styled.span`
  color: #22272b;
  font-size: 12px;
  display: flex;
  gap: 4px;
  margin-top: 50px;
  line-height: 1.3;
  /* margin-bottom: 10px; */
`
export const Version = styled(TermsOfService)`
  margin-top: 10px;
`

export const Error = styled.span`
  color: red;
  font-size: 12px;
  font-weight: 600;
`
