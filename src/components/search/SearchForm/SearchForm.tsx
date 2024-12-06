import React, { useEffect, useState } from 'react'
import * as S from './SearchForm.styles'
import { useRouter } from 'next/router'
import { MdOutlineManageSearch } from 'react-icons/md'
import { useSearchStore } from '@/state/searchState'
import { IoIosSearch } from 'react-icons/io'

interface SearchFormProps {
  type: 'header' | 'main'
  customButton?: React.ReactNode
}

export default function SearchForm({
  type = 'main',
  customButton,
}: SearchFormProps) {
  const router = useRouter()
  const { searchWrd, setSearchWrd, clearSearch } = useSearchStore()
  const [localSearchWrd, setLocalSearchWrd] = useState<string>(searchWrd || '')

  useEffect(() => {
    setLocalSearchWrd(localSearchWrd)

    if (type === 'main') {
      if (searchWrd) {
        setLocalSearchWrd(searchWrd)
      }
    } else {
      return
    }
  }, [type, searchWrd])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    router.push(`/search?keyword=${localSearchWrd}`)
    setSearchWrd(localSearchWrd)

    if (type === 'header') {
      clearSearch()
      setLocalSearchWrd('')
    }

    if (!localSearchWrd) {
      alert('Please enter a keyword to search.')
      return
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchWrd(event.target.value)
  }

  return (
    <S.SearchWrapper onSubmit={handleSubmit}>
      {type === 'main' && (
        <S.StyleWrapper>
          <S.SearchMainIcon>
            <MdOutlineManageSearch />
          </S.SearchMainIcon>
          <S.SearchMainInput
            type="text"
            placeholder={'   57-27-2    |    C9H8O4    |    C1=CC=C(C=C1)C=O'}
            value={localSearchWrd}
            onChange={handleInputChange}
          />
          {customButton ? (
            customButton
          ) : (
            <S.SearchButton type="submit">Search</S.SearchButton>
          )}
        </S.StyleWrapper>
      )}

      {type === 'header' && (
        <S.StyleWrapper>
          <S.SearchHeaderIcon>
            <IoIosSearch />
          </S.SearchHeaderIcon>
          <S.SearchHeaderInput
            type="text"
            placeholder={' search...'}
            value={localSearchWrd}
            onChange={handleInputChange}
          />
        </S.StyleWrapper>
      )}
    </S.SearchWrapper>
  )
}
