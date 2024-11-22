import React, { useEffect, useState } from 'react'
import useDataListQuery from '@/pages/api/query/useDataSearchQuery'
import SearchForm from '@/components/search/SearchForm'
import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import Pagination from '@/components/layout/Pagination'
import Spacing from '@/components/common/Spacing'
import SearchContent from '@/components/search/SearchContent'
import { useRouter } from 'next/router'

export type ItemType = {
  casNo: string
  chemNameKor: string
  unNo?: string
  enNo?: string
  keNo?: string
}

export type DataListType = {
  items: ItemType[] // 아이템 배열
  totalCount: number // 전체 아이템 수
  pageNo: number // 현재 페이지 번호
  refetchOnWindowFocus: boolean
}

export default function SearchPage() {
  const router = useRouter()
  const keywordFromQuery = (router.query.keyword as string) || ''
  const [searchWrd, setSearchWrd] = useState(keywordFromQuery)
  const [fetchWrd, setFetchWrd] = useState(keywordFromQuery)
  const [currentPage, setCurrentPage] = useState(1)

  // 데이터 가져오기
  const { data, isLoading, isFetching } = useDataListQuery({
    searchWrd: fetchWrd,
    searchCnd: 0,
    pageNo: currentPage,
    refetchOnWindowFocus: false,
  })

  const handleMainSearch = (searchValue: string) => {
    setFetchWrd(searchValue)
    setCurrentPage(1)
    router.push(`/search?keyword=${searchValue}`)
  }

  // Pagination 페이지 변경
  const handleSetPage = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (!keywordFromQuery) {
      setSearchWrd('')
    } else {
      setSearchWrd(keywordFromQuery)
    }
  }, [keywordFromQuery])

  const totalCount = data?.totalCount || 0
  const items = data?.itemList || []

  return (
    <Layout>
      <ListHeader renderType="compound" category="INTEGRATED SEARCH" />
      <SearchForm
        onSearch={handleMainSearch}
        searchWrd={searchWrd}
        type="main"
      />
      <Spacing size={40} />
      <SearchContent
        searchWrd={searchWrd}
        items={items}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      {items.length > 0 && (
        <Pagination
          currentPage={currentPage}
          handleSetPage={handleSetPage}
          totalItems={totalCount}
        />
      )}
    </Layout>
  )
}
