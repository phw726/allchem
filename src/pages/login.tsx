import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import LogInForm from '@/components/login'
import React from 'react'

export default function LoginPage() {
  return (
    <Layout isFooter={false}>
      <ListHeader renderType="post" category="Sign In" />
      <LogInForm type="login" />
    </Layout>
  )
}
