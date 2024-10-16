import { LuDot } from 'react-icons/lu'
import * as S from './ListBody.styles'
import { FaAngleRight } from 'react-icons/fa'
import { css } from '@emotion/react'
import { ILogo1 } from '../../../../public/image'

interface ListBodyProps {
  item: {
    id?: string
    title?: string
    summary?: string
    chemNameKor?: string
    chemId?: string
    casNo?: string
    enNo?: string
    keNo?: string
    unNo?: string
    user?: string
    date?: string // post date
  }
  renderType: 'compound' | 'post'
}

export default function ListBody({ item, renderType }: ListBodyProps) {
  const href =
    renderType === 'compound' ? `/compound/${item.id}` : `/post/${item.id}`

  return (
    <S.ListWrapper>
      <S.ListItem href={href}>
        {renderType === 'compound' ? (
          <>
            <S.ItemImg src={ILogo1} alt="compound img" sizes="auto" />
            <S.ItemInfoWrapper>
              <S.ItemName className="item-name">{item.chemNameKor}</S.ItemName>
              <S.ItemInfo className="item-info">CAS No.{item.casNo}</S.ItemInfo>
              <S.ItemInfo className="item-info">
                ChemId: {item.chemId}
              </S.ItemInfo>
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
        ) : (
          <>
            <S.PostInfoWrapper>
              <span>
                <S.PostName className="item-name">{item.title}</S.PostName>
                <S.PostInfo className="item-info user">
                  {item.user} <LuDot css={dotStyle} /> {item.date}
                </S.PostInfo>
              </span>
              <S.PostInfo className="post-info">{item.summary}</S.PostInfo>
            </S.PostInfoWrapper>
          </>
        )}
        <FaAngleRight css={rightStyle} />
      </S.ListItem>
    </S.ListWrapper>
  )
}

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
