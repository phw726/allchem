import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import CommentList from '@/components/mypage/commentList'
import LikeChemList from '@/components/mypage/likeChemList'
import Profile from '@/components/mypage/profile'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import BookmarkPostList from '@/components/mypage/bookmarkPostList'
import MyPostList from '@/components/mypage/myPostList'
import LikePostList from '@/components/mypage/likePostList'

export type MyPageCategory =
  | 'Liked Chems'
  | 'Liked Posts'
  | 'Bookmarks Posts'
  | 'My Posts'
  | 'My Comments'

const CATEGORIES: MyPageCategory[] = [
  'Liked Chems',
  'Liked Posts',
  'Bookmarks Posts',
  'My Posts',
  'My Comments',
]

export default function Mypage() {
  const [activeCategory, setActiveCategory] =
    useState<MyPageCategory>('Liked Chems')

  const renderContent = () => {
    switch (activeCategory) {
      case 'Liked Chems':
        return <LikeChemList />
      case 'Liked Posts':
        return <LikePostList />
      case 'Bookmarks Posts':
        return <BookmarkPostList />
      case 'My Posts':
        return <MyPostList />
      case 'My Comments':
        return <CommentList />

      default:
        return null
    }
  }

  return (
    <Layout>
      <ListHeader renderType="post" pageTitle="MY PAGE" />
      <Profile />
      <MyPageContentWrapper>
        <CategoryWrapper>
          {CATEGORIES.map(category => (
            <CategoryButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryWrapper>

        <ContentWrapper>{renderContent()}</ContentWrapper>
      </MyPageContentWrapper>
    </Layout>
  )
}

const MyPageContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; /* 카테고리 1: 콘텐츠 3 비율 */
  gap: 20px; /* 열 간격 */
  margin: 20px 20px 0px;
`
const CategoryWrapper = styled.div`
  display: flex;
  height: 220px;
  flex-direction: column;
  gap: 10px;
  background-color: #f9f9f9; /* 배경색 추가 */
  padding: 15px;
  border: 1px solid #22272b;
  border-radius: 5px;
  /* margin-top: 20px; */
`

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  flex-direction: column;
  background-color: ${({ active }) => (active ? '#22272b' : '#e0e0e0')};
  color: ${({ active }) => (active ? '#fff' : '#22272b')};
  font-family: monospace;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#22272c' : '#d6d6d6')};
  }
`
const ContentWrapper = styled.div`
  padding: 20px 20px 0;
  border: 1px solid #22272b;
  border-radius: 5px;
`
