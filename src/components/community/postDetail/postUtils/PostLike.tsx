import React, { useEffect, useState } from 'react'
import * as S from './postUtils.styles'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useAuth } from '@/hooks/useAuth'
import { useLike } from '@/hooks/useLike'
import { PostProps } from '@/utils/types'

export interface LikeProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function PostLike({ post, getPost }: LikeProps) {
  const { user } = useAuth()
  const { likes, mutate: toggleLike } = useLike()
  const isLike = !!likes?.some(
    like => like.postId === post.postId && like.userId === user?.uid,
  ) // isLike 기본값이 false

  const likeCount =
    likes?.filter(like => like.postId === post.postId).length || 0

  const handletoggleLike = () => {
    if (!user) {
      alert('Please use after signing in.')
      return
    }

    toggleLike({ post })
  }
  return (
    <S.UtilBtn type="button" onClick={handletoggleLike} $active={isLike}>
      {isLike ? <AiFillLike /> : <AiOutlineLike />}
      <small>{likeCount}</small>
    </S.UtilBtn>
  )
}
