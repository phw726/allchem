import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

export const ListWrapper = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #e0e0e0;
`

export const ListItem = styled(Link)`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 120px;
  align-items: center;

  /* &:first-child {
    border-top: 1px solid #e0e0e0;
  } */

  &:hover {
    color: royalblue;
    background-color: #fafafa;

    div {
      &.item-name,
      &.item-info,
      &.post-info,
      span {
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
  overflow: hidden;
  height: auto;
  /* max-height: 140px; */

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
  display: flex;
  width: auto;
  flex-direction: column;
  margin: 10px 50px 10px 0;
  font-size: 18px;
  font-weight: 600;
  text-align: start;
  overflow: hidden;

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

export const Comment = styled(ItemInfo)`
  color: royalblue;
  margin-bottom: 10px;
`
export const PostInfo = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  overflow: hidden;

  &.post-info {
    color: #22272b;
    margin: 8px 50px 20px 0;
    width: auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }

  &.user {
    color: gray;
    display: flex;
    text-align: center;
    align-items: center;
    margin-top: 20px;
  }
`
