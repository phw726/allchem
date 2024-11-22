import React, { useContext, useEffect, useState } from 'react'
import * as S from './postUtils.styles'

import { IoShareSocialOutline } from 'react-icons/io5'
import AuthContext from '../../../../hook/AuthContext'
import { PostProps } from '../../postForm/PostForm'
import { db } from '../../../../../firebase'
import { arrayUnion, doc, updateDoc } from '@firebase/firestore'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

export interface LikeProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function PostLike({ post, getPost }: LikeProps) {
  const [isLike, setIsLike] = useState(false)
  const { user } = useContext(AuthContext)
  const likeCount = post?.likes?.length || 0

  useEffect(() => {
    if (user?.uid && post.likes) {
      const userLiked = post.likes.some(like => like.uid === user.uid)
      setIsLike(userLiked)
    }
  }, [user, post.likes])

  const toggleLike = async () => {
    if (!user) {
      alert('Please use after signing in.')
      return
    }

    if (post && post.id) {
      try {
        const LikeRef = doc(db, 'posts', post.id)

        const likeObj = {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toLocaleDateString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }

        // like 취소

        if (isLike) {
          const updatedLikes = (post.likes || []).filter(
            like => like.uid !== user.uid,
          )
          await updateDoc(LikeRef, { likes: updatedLikes })
          setIsLike(false)
          alert('Like removed successfully')
        } else {
          // like 추가
          await updateDoc(LikeRef, {
            likes: arrayUnion(likeObj),
          })

          setIsLike(true)
          alert('Like added successfully')
        }

        await getPost(post.id)
      } catch (e) {
        console.log(e)
        alert('Failed to add Like. Please try again later')
      }
    }
  }
  return (
    <S.UtilBtn type="button" onClick={toggleLike} $active={isLike}>
      {isLike ? <AiFillLike /> : <AiOutlineLike />}
      <small>{likeCount}</small>
    </S.UtilBtn>
  )
}
