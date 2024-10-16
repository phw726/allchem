import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

export const ListWrapper = styled.div`
  width: auto;
  height: auto;
`

export const ListItem = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 120px;
  height: auto;
  border-top: 1px solid #e0e0e0;

  &:hover {
    color: royalblue;
    background-color: #fafafa;

    div {
      &.item-name,
      &.item-info,
      &.post-info {
        color: royalblue;
      }
    }

    svg {
      color: royalblue;
    }
  }
`

export const ItemImg = styled(Image)`
  width: 80px;
  height: 80px;
  position: relative;
  margin-left: 20px;
  flex-shrink: 0;
`

export const ItemInfoWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 20px;
  color: #22272b;
  line-height: 1.5;
`
export const PostInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  color: #22272b;
  line-height: 1.5;

  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-right: 40px;
  }
`

export const ItemName = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin: 20px 50px 10px 0;
  &.item-name {
    color: #22272b;
  }
`
export const PostName = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 50px 10px 0;
  display: flex;
  flex-direction: column;
  /* margin-top: 3px; */

  &.item-name {
    color: #22272b;
  }
`

export const ItemInfo = styled.div`
  font-size: 12px;
  display: flex;
  &.item-name {
    color: #22272b;
  }
`
export const PostInfo = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 3px 0;

  &.post-info {
    color: #22272b;
    margin: 5px 0 30px 0;
    width: 74%;
  }

  &.user {
    color: gray;
    display: flex;
    text-align: center;
    align-items: center;
  }
`
