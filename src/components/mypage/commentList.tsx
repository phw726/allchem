import React, { useEffect, useState } from 'react'
import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import { useAuth } from '@/hooks/useAuth'
import { useFetchPost } from '@/hooks/useFetchPost'

export default function CommentList() {
  const { user } = useAuth()
  const { posts: comments } = useFetchPost({
    userId: user?.uid || '',
    collectionName: 'COMMENT',
  })

  const myComments = Array.isArray(comments) ? comments : []

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
            .slice(0, 10)
            .map(post => (
              <ListBody
                renderType="comment"
                item={post}
                isCompact={true}
                key={post.id}
              />
            ))
        : 'no comment'}
    </S.Wrapper>
  )
}
