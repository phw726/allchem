/** @jsxImportSource @emotion/react */

import Layout from '@/components/layout/Layout'
import 'swiper/css'
import Introduction from '@/components/main/Introduction'
import Membership from '@/components/main/membership'

export default function Home() {
  return (
    <Layout bgColor="#edf0f5">
      <Introduction />
      <Membership />
    </Layout>
  )
}
