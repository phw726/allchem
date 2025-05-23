import Layout from '@/components/layout/Layout'
import ListBody from '@/components/layout/ListBody'
import ListHeader from '@/components/layout/ListHeader'
import { SearchButton } from '@/components/search/SearchForm.styles'
import styled from '@emotion/styled'
import { getAuth } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Pagination from '@/components/layout/Pagination'
import { usePost } from '@/hooks/usePost'
import { useRouter } from 'next/router'

export type CategoryType = 'All' | 'Notice' | 'Community' | 'Q&A'
export const CATEGORIES: CategoryType[] = ['All', 'Notice', 'Community', 'Q&A']

export default function CommunityPage() {
  const [isLogIn, setIsLogIn] = useState(false)
  const [activeTab, setactiveTab] = useState<CategoryType>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const auth = getAuth()
  const router = useRouter()
  const { postId } = router.query as { postId: string }
  const { posts } = usePost({ postId, category: activeTab })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLogIn(!!user)
    })
    return () => unsubscribe()
  }, [auth])

  const handleSetPage = (page: number) => {
    setCurrentPage(page)
  }

  const totalCount = posts.length

  return (
    <Layout>
      <ListHeader pageTitle="COMMUNITY" renderType="post" />
      <FormWrapper>
        <CategoryWrapper>
          {CATEGORIES.map(category => (
            <Category
              type="button"
              key={category}
              role="presentation"
              onClick={() => setactiveTab(category)}
            >
              {category}
            </Category>
          ))}
        </CategoryWrapper>

        {isLogIn && (
          <>
            <SearchButton style={{ marginBottom: '10px' }}>
              <Link href="/community/post">Writing</Link>
            </SearchButton>
          </>
        )}
      </FormWrapper>
      <ContentWrapper>
        {posts?.length > 0 ? (
          posts?.map((post, idx) => (
            <ListBody key={post.uid + idx} item={post} renderType="post" />
          ))
        ) : (
          <strong>게시글이 없습니다.</strong>
        )}
      </ContentWrapper>
      <Pagination
        currentPage={currentPage}
        handleSetPage={handleSetPage}
        totalItems={totalCount}
      />
    </Layout>
  )
}

/// POSTFORM 카테고리, 글쓰기버튼 추가 ///
const FormWrapper = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
`

const CategoryWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
`

const Category = styled.button`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: #808080;
  border: none;
  min-width: 80px;
  background-color: transparent;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  transition: all 0.4s ease;
  padding: 10px 15px;

  &:hover,
  &:focus {
    background-color: royalblue;
    color: #fff;
  }
`
const ContentWrapper = styled.div`
  margin: 0 20px;
`
