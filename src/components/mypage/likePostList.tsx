import React, { useContext, useEffect, useState } from 'react'
import { PostProps } from '../community/postForm/PostForm'
import AuthContext from '../../hook/AuthContext'
import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore'
import { db } from '../../../firebase'

export default function LikePostList() {
  const [likePosts, setLikePosts] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts')

      const likePostQuery = query(
        postsRef,
        where('likes', 'array-contains', { uid: user.uid }),
      )

      onSnapshot(likePostQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }))
        setLikePosts(dataObj as PostProps[])
      })
    }
  }, [user])
  const totalCount = likePosts.length
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>BOOKMARKS({totalCount})</S.Title>
        <S.More href="/mypage/bookmarks">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>
      {likePosts && likePosts.length > 0
        ? likePosts
            .slice(0, 5)
            .map(post => (
              <ListBody renderType="post" item={post} key={post.createdAt} />
            ))
        : 'no post'}
    </S.Wrapper>
  )
}
