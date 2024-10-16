import ListBody from '@/components/layout/ListBody'
import { ItemType } from '@/pages/search'
import styled from '@emotion/styled'

interface SearchContentProps {
  searchWrd: string
  items: ItemType[]
  isLoading: boolean
  isFetching: boolean
}

export default function SearchContent({
  searchWrd,
  items,
  isLoading,
  isFetching,
}: SearchContentProps) {
  let content = null
  if (isLoading || isFetching) {
    content = 'Loading...' // 로딩 중일 때
  } else if (!searchWrd.trim()) {
    content = 'Please enter your keyword(s) to search.' // 검색어가 없을 때
  } else if (items.length === 0) {
    content = 'There are no matching data found in the database.' // 데이터가 없을 때
  }

  return (
    <>
      {content ? (
        <SearchContentStyled>{content}</SearchContentStyled>
      ) : (
        items.map((item: ItemType) => (
          <ListBody key={item.casNo} item={item} renderType="compound" />
        ))
      )}
    </>
  )
}

const SearchContentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  /* color: #22272b; */
  color: royalblue;
  font-family: 'Poppin';
  height: 300px;
  cursor: default;
`
