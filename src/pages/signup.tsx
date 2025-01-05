import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import LogInForm from '@/components/login'
import React from 'react'

export default function SignUpPage() {
  return (
    <Layout isFooter={false}>
      <ListHeader renderType="post" pageTitle="CREATE ACCOUNT" />
      <LogInForm type="signup" />
    </Layout>
  )
}
