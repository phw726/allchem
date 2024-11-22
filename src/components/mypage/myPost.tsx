import React, { useContext, useEffect, useState } from 'react'
import { PostProps } from '../community/postForm/PostForm'
import AuthContext from '../../hook/AuthContext'
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
import { tree } from 'next/dist/build/templates/app-page'
import { MdMoreVert } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'

export default function MyPost() {
  const [myPosts, setMyPosts] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts')

      const myPostQuery = query(
        postsRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc'),
      )

      onSnapshot(myPostQuery, snapShot => {
        const dataObj = snapShot.docs.map(doc => ({
          ...doc.data(),
          id: doc?.id,
        }))
        setMyPosts(dataObj as PostProps[])
      })
    }
  }, [user])
  const totalCount = myPosts.length

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>MY POSTS({totalCount})</S.Title>
        <S.More href="/mypage/myposts">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>

      {myPosts && myPosts.length > 0
        ? myPosts
            .slice(0, 5)
            .map(post => (
              <ListBody
                isCompact={true}
                renderType="post"
                item={post}
                key={post.createdAt}
              />
            ))
        : 'no post'}
    </S.Wrapper>
  )
}
