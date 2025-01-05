/** @jsxImportSource @emotion/react **/

import { LuDot } from 'react-icons/lu'
import * as S from './ListBody.styles'
import { FaAngleRight } from 'react-icons/fa'
import { css } from '@emotion/react'
import { ILogo1 } from '../../../../public/image'
import { dangerHTML, formatTimestamp } from '@/utils/helpers'

interface ListBodyProps {
  item: {
    id?: string
    chemNameKor?: string
    chemId?: string
    casNo?: string
    enNo?: string
    keNo?: string
    unNo?: string
    user?: string

    ///post
    postId?: string
    title?: string
    createdAt?: string
    updatedAt?: string
    content?: string
    email?: string
    name?: string
    uid?: string

    comment?: string
  }

  renderType: 'compound' | 'post' | 'comment'
  isCompact?: boolean
}

export default function ListBody({
  item,
  renderType,
  isCompact = false,
}: ListBodyProps) {
  const summary = dangerHTML(item.content as string).slice(0, 200)
  const chemId = String(item.chemId).padStart(6, '0')

  const href =
    renderType === 'compound'
      ? `/compound/${chemId}`
      : renderType === 'post'
        ? `/community/${item.postId}`
        : ''

  return (
    <S.ListWrapper>
      <S.ListItem href={href} css={isCompact ? CompactStyle : undefined}>
        {renderType === 'compound' && CompoundStyle(item)}
        {renderType === 'post' && PostStyle(item, isCompact, summary)}
        {renderType === 'comment' && CommentStyle(item, isCompact, summary)}

        <FaAngleRight css={rightStyle} />
      </S.ListItem>
    </S.ListWrapper>
  )
}

const CompoundStyle = (item: any) => (
  <>
    <S.ItemImg src={ILogo1} alt="compound img" sizes="auto" />
    <S.ItemInfoWrapper>
      <S.ItemName className="item-name">{item.chemNameKor}</S.ItemName>
      <S.ItemInfo className="item-info">CAS No.{item.casNo}</S.ItemInfo>
      <S.ItemInfo className="item-info">ChemId: {item.chemId}</S.ItemInfo>
      {item.enNo && (
        <S.ItemInfo className="item-info">enNo: {item.enNo}</S.ItemInfo>
      )}
      {item.keNo && (
        <S.ItemInfo className="item-info">keNo: {item.keNo}</S.ItemInfo>
      )}
      {item.unNo && (
        <S.ItemInfo className="item-info">unNo: {item.unNo}</S.ItemInfo>
      )}
    </S.ItemInfoWrapper>
  </>
)

const PostStyle = (item: any, isCompact: boolean, summary: string) => (
  <>
    <S.PostInfoWrapper>
      <S.PostInfo className="item-info user">
        {item?.email || item?.name} <LuDot css={dotStyle} />
        {item?.updatedAt
          ? `${formatTimestamp(item.updatedAt)} (Edited) `
          : formatTimestamp(item.createdAt as string)}
      </S.PostInfo>
      <S.PostName css={isCompact ? CompactStyle : undefined}>
        {item.title}
      </S.PostName>

      {!isCompact && item.content && (
        <S.PostInfo className="post-info">
          {summary}
          {summary.length === 200 && '...'}
        </S.PostInfo>
      )}
    </S.PostInfoWrapper>
  </>
)

const CommentStyle = (item: any, isCompact: boolean, summary: string) => (
  <>
    <S.PostInfoWrapper>
      <S.PostInfo className="item-info user">
        {item?.email || item?.name} <LuDot css={dotStyle} />
        {formatTimestamp(item.createdAt as string)}
      </S.PostInfo>
      <S.PostName css={isCompact ? CompactStyle : undefined}>
        {item.title}
      </S.PostName>
      <S.Comment>{summary}</S.Comment>
    </S.PostInfoWrapper>
  </>
)

const rightStyle = css`
  margin-right: 0;
  margin-left: auto;
  font-size: 20px;
  color: #b2b3b3;
  cursor: pointer;
  margin-right: 20px;
`

const dotStyle = css`
  display: flex;
`

const CompactStyle = css`
  font-size: 12px;
  min-height: 0;
  padding-bottom: 4px;
`
