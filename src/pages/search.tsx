import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import ListHeader from '@/components/layout/ListHeader'
import Pagination from '@/components/layout/Pagination'
import Spacing from '@/components/common/Spacing'
import SearchContent from '@/components/search/SearchContent'
import { useRouter } from 'next/router'
import useSearchQuery from './api/query/KOSHA/useSearchQuery'
import useDebounce from '@/hooks/useDebounce'
import { useSearchStore } from '@/state/searchState'
import SearchForm from '@/components/search/SearchForm'
import { debounce } from 'lodash'
import { getSearchCondition } from '@/utils/helpers'

export type ItemType = {
  casNo: string
  chemNameKor: string
  unNo?: string
  enNo?: string
  keNo?: string
}

export default function SearchPage() {
  const router = useRouter()
  const { searchWrd, setSearchWrd } = useSearchStore()
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchWrd = useDebounce(searchWrd, 500)
  const keywordFromQuery = (router.query.keyword as string) || ''

  // 데이터 가져오기
  const { data, isLoading, isFetching } = useSearchQuery({
    searchWrd: debouncedSearchWrd,
    searchCnd: getSearchCondition(debouncedSearchWrd),
    pageNo: currentPage,
    refetchOnWindowFocus: false,
    enabled: !!searchWrd.trim(),
  })

  // const handleMainSearch = (searchValue: string) => {
  //   setSearchWrd(searchValue)
  //   // setLazyFetch(true)
  //   setCurrentPage(1)
  //   router.push(`/search?keyword=${searchValue}`)
  // }

  // Pagination 페이지 변경
  const handleSetPage = (page: number) => {
    setCurrentPage(page)
  }

  // useEffect(() => {
  //   const keywordFromQuery = (router.query.keyword as string) || ''
  //   if (keywordFromQuery && keywordFromQuery !== searchWrd) {
  //     setSearchWrd(keywordFromQuery) // 쿼리에서 검색어를 받아 zustand 상태로 업데이트
  //   }
  // }, [router.query.keyword, setSearchWrd, searchWrd])

  useEffect(() => {
    if (keywordFromQuery) {
      setSearchWrd(keywordFromQuery)
    }
  }, [keywordFromQuery, setSearchWrd])

  const totalCount = data?.totalCount || 0
  const items = data?.itemList || []

  return (
    <Layout>
      <ListHeader renderType="post" pageTitle="INTEGRATED SEARCH" />
      <SearchForm type="main" />
      {/* <SearchForm
        onSearch={handleMainSearch}
        searchWrd={searchWrd}
        type="main"
      /> */}
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
