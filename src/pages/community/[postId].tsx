import PostDetailForm from '@/components/community/postDetail'
import { PostProps } from '@/components/community/postForm/PostForm'
import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import React from 'react'

export default function PostDetailPage() {
  ///getStaticProps : 블로그 등 정적페이지 생성
  ///getServerSideProps : 실시간 변동해야하는 페이지
  ///getStaticPaths: 동적경로[id] + getStaticProps

  return (
    <Layout>
      <PostDetailForm />
    </Layout>
  )
}
