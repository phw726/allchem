import * as S from './postUtils.styles'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { useToggleItem } from '@/hooks/useToggleItem'

export default function PostBookmark({ postId }: { postId: string }) {
  const { user } = useAuth()
  const { isToggled: isBooked, toggleItem: toggleBookmarked } = useToggleItem(
    'BOOKMARK',
    postId,
  )

  const handleBookmark = (postId: string) => {
    if (!user) {
      alert('Please use after signing in.')
      return
    }

    toggleBookmarked()
  }

  return (
    <S.UtilBtn
      type="button"
      onClick={() => handleBookmark(postId)}
      $active={isBooked}
    >
      {isBooked ? <FaBookmark /> : <FaRegBookmark />}
    </S.UtilBtn>
  )
}
