import React, { useContext, useEffect, useState } from 'react'
import * as S from './postUtils.styles'

import AuthContext from '../../../../hooks/useAuth'
import { db } from '../../../../../firebase'
import { arrayUnion, doc, updateDoc } from '@firebase/firestore'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { PostProps } from '@/utils/types'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'

export interface BookMarkProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function PostBookmark({ post, getPost }: BookMarkProps) {
  const { user } = useAuth()
  const { bookmarks, mutate: toggleBook } = useBook({ postId: post.postId })
  const isBooked = !!bookmarks?.some(
    bookmark => bookmark.postId === post.postId,
  )

  const handleBookmark = () => {
    if (!user) {
      alert('Please use after signing in.')
      return
    }

    toggleBook({ post })
  }

  return (
    <S.UtilBtn type="button" onClick={handleBookmark} $active={isBooked}>
      {isBooked ? <FaBookmark /> : <FaRegBookmark />}
    </S.UtilBtn>
  )
}
