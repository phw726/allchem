import React, { useContext, useEffect, useState } from 'react'
import { PostProps } from '../community/postForm/PostForm'
import AuthContext from '../../hooks/useAuth'
import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@firebase/firestore'
import { db } from '../../../firebase'
import ListBody from '../layout/ListBody'

export default function CommentList() {
  const [myComment, setMyComment] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts')

      const myCommentQuery = query(
        postsRef,
        where('comments', 'array-contains', { uid: user.uid }),
        orderBy('comments.createdAt', 'desc'),
      )

      onSnapshot(myCommentQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }))
        setMyComment(dataObj as PostProps[])
      })
    }
  }, [user])
  const totalCount = myComment.length

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>MY COMMENTS({totalCount})</S.Title>
        <S.More href="/mypage/mycomments">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>
      {myComment && myComment.length > 0
        ? myComment
            .slice(0, 5)
            .map(post => (
              <ListBody renderType="post" item={post} key={post.createdAt} />
            ))
        : 'no comment'}
    </S.Wrapper>
  )
}
