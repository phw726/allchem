import PostForm from '@/components/community/postForm'
import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'

export default function PostEditPage() {
  return (
    <Layout isFooter={false} bgColor="#edf0f5">
      <ListHeader pageTitle="EDIT POST" renderType="post" />
      <PostForm />
    </Layout>
  )
}
