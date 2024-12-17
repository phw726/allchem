import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import Spacing from '../common/Spacing'
import { IoMdMore } from 'react-icons/io'
import { useAuth } from '@/hooks/useAuth'
import { useFetchToggledPost } from '@/hooks/useFetchPostToggle'

export default function BookmarkPostList(postId: string) {
  const { user } = useAuth()

  const { posts: myBookmarkPost } = useFetchToggledPost({
    userId: user?.uid || '',
    collectionName: 'BOOKMARK',
  })

  if (!user) {
    return <p>Please log in to view your bookmarks.</p>
  }

  const totalCount = myBookmarkPost.length

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>BOOKMARKS({totalCount})</S.Title>
        <S.More href="/mypage/bookmarks">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>

      {totalCount > 0
        ? myBookmarkPost
            .slice(0, 3)
            .map(post => (
              <ListBody
                isCompact={true}
                renderType="post"
                item={post}
                key={post.id}
              />
            ))
        : 'no post'}
      {Array.isArray(myBookmarkPost) && totalCount > 3 ? (
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
