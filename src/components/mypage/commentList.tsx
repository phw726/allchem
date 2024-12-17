import React, { useEffect, useState } from 'react'
import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import { useAuth } from '@/hooks/useAuth'
import { useComment } from '@/hooks/useComment'

export default function CommentList() {
  const { user } = useAuth()
  const { userComments = [] } = useComment('', user?.uid)

  const myComments = Array.isArray(userComments) ? userComments : []

  const totalCount = myComments?.length

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>MY COMMENTS({totalCount})</S.Title>
        <S.More href="/mypage/mycomments">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>
      {myComments && totalCount > 0
        ? myComments
            .slice(0, 3)
            .map(post => (
              <ListBody renderType="post" item={post} key={post.createdAt} />
            ))
        : 'no comment'}
    </S.Wrapper>
  )
}
