import PostForm from '@/components/community/postForm'
import Layout from '@/components/layout/Layout'

export default function PostEditPage() {
  return (
    <Layout isFooter={false} bgColor="#edf0f5">
      <PostForm />
    </Layout>
  )
}
