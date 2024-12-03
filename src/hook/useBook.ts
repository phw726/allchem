import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from './useAuth'
import { getBooks, getMyBookmark, toggleBook } from '@/remote/bookmarkService'
import { PostProps } from '@/utils/types'

export function useBook({
  userId,
  postId,
}: {
  userId?: string
  postId?: string
}) {
  const { user } = useAuth()
  const client = useQueryClient()
  const currentUserId = userId || user?.uid || ''

  const { data: bookmarks, isLoading } = useQuery(
    ['bookmarks', { userId: currentUserId, postId }],
    () => {
      if (postId) {
        return getBooks({ postId, userId: currentUserId })
      } else if (currentUserId) {
        return getMyBookmark({ userId: currentUserId })
      } else {
        throw new Error('Either bookmarkId or userId must be provided')
      }
    },
    { enabled: !!currentUserId || !!postId },
  )

  const { mutate } = useMutation(
    ({ post }: { post: Pick<PostProps, 'postId'> }) => {
      if (user == null) {
        throw new Error('User must be logged in to like a post')
      }
      return toggleBook({ post, userId: user.uid })
    },
    {
      onSuccess: (_, { post }) => {
        const isBooked = bookmarks?.some(
          bookmark => bookmark.postId === post.postId,
        )

        if (isBooked) {
          alert('Bookmark removed successfully!')
        } else {
          alert('Bookmark added successfully!')
        }
        client.invalidateQueries(['bookmarks'])

        if (postId) {
          client.invalidateQueries(['bookmarks', postId])
        } else if (currentUserId) {
          client.invalidateQueries(['userBookmarks', currentUserId])
        }
      },
      onError: (error: Error) => {
        alert('Failesd to like the post. Please try again later.')
        console.error(error)
      },
    },
  )
  return { bookmarks, mutate }
}
