import PostForm from '@/components/community/postForm'
import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import React from 'react'

export default function CommunityPostPage() {
  return (
    <Layout isFooter={false} bgColor="#edf0f5">
      <ListHeader pageTitle="CREATE POST" renderType="post" />
      <PostForm />
    </Layout>
  )
}
