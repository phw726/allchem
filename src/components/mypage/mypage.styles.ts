import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

export const Wrapper = styled.div`
  display: flex;
  margin: 20px 20px 60px;
  flex-direction: column;
  align-items: center;
`

export const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  color: #22272b;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #22272b;
`
export const Title = styled.span`
  display: flex;
  font-size: 17px;
  font-weight: 600;
  font-family: monospace;
`

export const More = styled(Link)`
  display: flex;
  color: #22272b;
  cursor: pointer;

  &:hover {
    color: royalblue;
  }
`

//// profile ////

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 60px 20px 60px;
`

export const UserImg = styled(Image)`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 4px;
  background: #f2f2f2;
  border-radius: 50%;
  object-fit: contain;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-family: cursive;
  margin-left: 10px;
  gap: 10px;
`

export const Email = styled.span`
  color: #22272b;
  font-size: 15px;
  font-weight: 500;

  small {
    font-size: 12px;
    margin-left: 4px;
  }
`
export const Name = styled(Email)`
  font-size: 12px;
`

//// bookmarks ////
