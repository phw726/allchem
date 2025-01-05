import PostForm from '@/components/community/postForm'
import Layout from '@/components/layout/Layout'
import React from 'react'

export default function CommunityPostPage() {
  return (
    <Layout isFooter={false} bgColor="#edf0f5">
      <PostForm />
    </Layout>
  )
}
