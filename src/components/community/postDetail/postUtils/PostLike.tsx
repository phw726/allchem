import * as S from './postUtils.styles'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useAuth } from '@/hooks/useAuth'
import { useToggleItem } from '@/hooks/useToggleItem'
import { useFirebaseCRUD } from '@/hooks/useFirebaseCRUD'

export default function PostLike({ postId }: { postId: string }) {
  const { user } = useAuth()
  const {
    isToggled: isLike,
    toggleCount: likeCount,
    toggleItem: toggleLike,
  } = useToggleItem('LIKE', postId)

  const handleToggleLike = (postId: string) => {
    if (!user) {
      alert('Please use after signing in.')
      return
    }

    toggleLike()
  }

  return (
    <S.UtilBtn
      type="button"
      onClick={() => handleToggleLike(postId)}
      $active={isLike}
    >
      {isLike ? <AiFillLike /> : <AiOutlineLike />}
      <small>{likeCount}</small>
    </S.UtilBtn>
  )
}
