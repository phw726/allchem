import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import CommentList from '@/components/mypage/commentList'
import LikeChemList from '@/components/mypage/likeChemList'
import LikePostList from '@/components/mypage/likePostList'
import MyPost from '@/components/mypage/myPost'
import Profile from '@/components/mypage/profile'
import React from 'react'
import styled from '@emotion/styled'

export default function Mypage() {
  return (
    <Layout>
      <ListHeader renderType="post" category="MY PAGE" />
      <Profile />
      <PostWrapper>
        <LikePostList />
        <MyPost />
        <CommentList />
      </PostWrapper>
      <LikeChemList />
    </Layout>
  )
}

const PostWrapper = styled.div`
  display: grid;
  width: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`
