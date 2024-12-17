import * as S from './mypage.styles'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import ListBody from '../layout/ListBody'
import { IoMdMore } from 'react-icons/io'
import Spacing from '../common/Spacing'
import { useAuth } from '@/hooks/useAuth'
import { usePost } from '@/hooks/usePost'

export default function MyPost() {
  const { user } = useAuth()
  const { userPosts: myPosts = [] } = usePost('', user?.uid)

  const totalCount = Array.isArray(myPosts) ? myPosts?.length : 0

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>MY POSTS({totalCount})</S.Title>
        <S.More href="/mypage/myposts">
          <FaArrowAltCircleRight />
        </S.More>
      </S.TitleWrapper>
      {Array.isArray(myPosts) && myPosts.length > 0
        ? myPosts
            .slice(0, 3)
            .map(post => (
              <ListBody
                isCompact={true}
                renderType="post"
                item={post}
                key={post.createdAt}
              />
            ))
        : 'no post'}
      {Array.isArray(myPosts) && myPosts.length > 3 ? (
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
