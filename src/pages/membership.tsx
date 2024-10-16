import Spacing from '@/components/common/Spacing'
import Layout from '@/components/layout/Layout'
import Membership from '@/components/main/membership'
import React from 'react'

export default function MembershipPage() {
  return (
    <Layout bgColor="#edf0f5">
      <Spacing size={100} />
      <Membership />
    </Layout>
  )
}
