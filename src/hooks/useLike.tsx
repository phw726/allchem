import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from './useAuth'
import { getLikes, toggleLike } from '@/remote/likeService'
import { PostProps } from '@/utils/types'

export function useLike(likeId?: string) {
  const { user } = useAuth()
  const client = useQueryClient()

  const { data: likes } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    { enabled: user != null },
  )

  const { mutate } = useMutation(
    ({ post }: { post: Pick<PostProps, 'postId'> }) => {
      if (user == null) {
        throw new Error('User must be logged in to like a post')
      }
      return toggleLike({ post, userId: user.uid })
    },
    {
      onSuccess: (_, { post }) => {
        const isLiked = likes?.some(like => like.postId === post.postId)

        if (isLiked) {
          alert('Like removed successfully!')
        } else {
          alert('Like added successfully!')
        }
        client.invalidateQueries(['likes'])
      },
      onError: (error: Error) => {
        alert('Failed to like the post. Please try again later.')
        console.error(error)
      },
    },
  )

  return { likes, mutate }
}
