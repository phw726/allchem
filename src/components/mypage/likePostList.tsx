import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import Spacing from '../common/Spacing'
import { IoMdMore } from 'react-icons/io'
import { useAuth } from '@/hooks/useAuth'
import { useFetchPost } from '@/hooks/useFetchPost'

export default function LikePostList() {
  const { user } = useAuth()

  const { posts: mylikePost } = useFetchPost({
    userId: user?.uid || '',
    collectionName: 'LIKE',
  })

  if (!user) {
    return <p>Please log in to view your bookmarks.</p>
  }

  const totalCount = mylikePost.length

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>Like({totalCount})</S.Title>
        <S.More href="/mypage/bookmarks">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>

      {totalCount > 0
        ? mylikePost
            .slice(0, 10)
            .map(post => (
              <ListBody
                isCompact={true}
                renderType="post"
                item={post}
                key={post.id}
              />
            ))
        : 'no post'}
      {Array.isArray(mylikePost) && totalCount > 3 ? (
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
