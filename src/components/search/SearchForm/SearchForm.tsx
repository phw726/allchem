import React, { useState } from 'react'
import * as S from './SearchForm.styles'
import { useRouter } from 'next/router'
import { IoIosSearch } from 'react-icons/io'
import { MdOutlineManageSearch } from 'react-icons/md'

interface SearchFormProps {
  onSearch: (value: string) => void
  type: 'header' | 'main'
  searchWrd?: string
  customButton?: React.ReactNode
}

export default function SearchForm({
  onSearch,
  type = 'main',
  searchWrd = '',
  customButton,
}: SearchFormProps) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>(searchWrd)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchValue.trim()) {
      alert('Enter keyword(s) to search')
      router.push(`/search`)
      return
    }

    onSearch(searchValue)

    if (type === 'header') {
      router.push(`/search?keyword=${searchValue}`)
      setSearchValue('')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const defaultPlaceholder =
    type === 'main'
      ? '   57-27-2    |    C9H8O4    |    C1=CC=C(C=C1)C=O'
      : ' search...'

  return (
    <S.SearchWrpper onSubmit={handleSubmit}>
      {type === 'main' ? (
        <S.StyleWrapper>
          <S.SearchMainIcon>
            <MdOutlineManageSearch />
          </S.SearchMainIcon>
          <S.SearchMainInput
            type="text"
            placeholder={defaultPlaceholder}
            value={searchValue}
            onChange={handleInputChange}
          />
          {customButton ? (
            customButton
          ) : (
            <S.SearchButton type="submit">Search</S.SearchButton>
          )}
        </S.StyleWrapper>
      ) : (
        <S.StyleWrapper>
          <S.SearchHeaderIcon>
            <IoIosSearch />
          </S.SearchHeaderIcon>
          <S.SearchHeaderInput
            type="text"
            placeholder={defaultPlaceholder}
            value={searchValue}
            onChange={handleInputChange}
          />
        </S.StyleWrapper>
      )}
    </S.SearchWrpper>
  )
}
