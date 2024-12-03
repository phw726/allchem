import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import { useBook } from '@/hook/useBook'
import Spacing from '../common/Spacing'
import { IoMdMore } from 'react-icons/io'
import { usePost } from '@/hook/usePost'
import { PostProps } from '@/utils/types'

export default function BookmarkPostList() {
  const { bookmarks: myBooks } = useBook({})
  const { post: BookMarkPost, isLoading } = usePost({})

  console.log('bookmarklist:', myBooks)
  console.log('BookMarkPost:', BookMarkPost)

  const filterPost = Array.isArray(BookMarkPost)
    ? myBooks?.map(bookmark =>
        BookMarkPost.find(post => post.postId === bookmark.postId),
      )
    : []

  console.log('filterPOst:', filterPost)

  const totalCount = filterPost?.filter(Boolean)?.length || 0
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>BOOKMARKS({totalCount})</S.Title>
        <S.More href="/mypage/bookmarks">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>
      {filterPost && filterPost.length > 0
        ? filterPost
            .filter((post): post is PostProps => !!post) // undefined 필터링
            .slice(0, 5)
            .map((post: PostProps) => (
              <ListBody
                isCompact={true}
                renderType="post"
                item={post}
                key={post.postId}
              />
            ))
        : 'no post'}
      {Array.isArray(myBooks) && myBooks.length > 3 ? (
        <>
          <Spacing size={10} />
          <S.More href="/mypage/myposts">
            <IoMdMore />
          </S.More>
        </>
      ) : (
        ''
      )}
    </S.Wrapper>
  )
}
