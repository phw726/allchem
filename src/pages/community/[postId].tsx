import PostDetailForm from '@/components/community/postDetail'
import Layout from '@/components/layout/Layout'

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
