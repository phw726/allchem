import { useMemo } from 'react'
import * as S from './Pagination.styles'
import { FaAngleDoubleRight, FaAngleRight } from 'react-icons/fa'

type PaginationProps = {
  currentPage: number
  handleSetPage: (page: number) => void
  totalItems: number // 전체 항목 수
}

export default function Pagination({
  currentPage,
  handleSetPage,
  totalItems,
}: PaginationProps) {
  // totalItems를 사용하여 마지막 페이지 계산
  const [pageRange, lastPage] = useMemo(() => {
    const lastPage = Math.ceil(totalItems / 10)

    // 현재 페이지를 중심으로 페이지 네비게이션 범위 계산
    let startPage = Math.max(currentPage - 2, 1) // 현재 페이지 기준으로 좌우로 2개씩
    let endPage = Math.min(currentPage + 2, lastPage) // 마지막 페이지를 넘지 않도록 함

    // 첫 2페이지에선 고정, 3페이지부터 현재 페이지가 가운데 위치하도록 처리
    if (currentPage < 3) {
      startPage = 1
      endPage = Math.min(5, lastPage) // 최대 5개의 페이지 번호 출력
    } else if (currentPage > lastPage - 2) {
      startPage = Math.max(lastPage - 4, 1)
      endPage = lastPage
    }
    return [
      Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
      ),
      lastPage,
    ]
  }, [currentPage, totalItems])

  return (
    <S.Wrapper>
      {/* 맨 처음 페이지로 이동 */}
      {currentPage > 1 && (
        <S.ArrowWrapper $isRight>
          <S.Arrow onClick={() => handleSetPage(1)}>
            <FaAngleDoubleRight />
          </S.Arrow>
          <S.Arrow onClick={() => handleSetPage(currentPage - 1)}>
            <FaAngleRight />
          </S.Arrow>
        </S.ArrowWrapper>
      )}

      {/* 페이지 번호 출력 */}
      {pageRange.map(page => (
        <S.Item
          onClick={() => handleSetPage(page)}
          $active={page === currentPage}
          key={page}
        >
          {page}
        </S.Item>
      ))}

      {/* 다음 페이지 및 마지막 페이지로 이동 */}
      {currentPage < lastPage && (
        <S.ArrowWrapper>
          <S.Arrow onClick={() => handleSetPage(currentPage + 1)}>
            <FaAngleRight />
          </S.Arrow>
          <S.Arrow onClick={() => handleSetPage(lastPage)}>
            <FaAngleDoubleRight />
          </S.Arrow>
        </S.ArrowWrapper>
      )}
    </S.Wrapper>
  )
}
