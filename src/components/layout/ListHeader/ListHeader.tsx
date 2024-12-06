import * as S from './ListHeader.styles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SearchForm from '@/components/search/SearchForm'

interface ListHeaderProps {
  category: string
  renderType: 'compound' | 'post' // 렌더링 방식
}

export default function ListHeader({ renderType, category }: ListHeaderProps) {
  const [searchValue, setSearchValue] = useState('') // 검색어 상태

  const router = useRouter()

  const handleSearch = (value: string) => {
    if (value) {
      router.push(`/search?keyword=${value}`)
    } else {
      console.error('No search')
    }
  }
  return (
    <S.Wrapper>
      <S.MenuText>{category}</S.MenuText>
      {/* {renderType === 'compound' ? (
        <S.SearchWrapper>
          <SearchForm type="main" onSearch={handleSearch} />
          <S.SearchButton
            type="submit"
            onClick={() => handleSearch(searchValue)}
          >
            Search
          </S.SearchButton>
        </S.SearchWrapper>
      ) : (
        ''
      )} */}
    </S.Wrapper>
  )
}
