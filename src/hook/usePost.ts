import { PostProps } from '@/utils/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getMyPost, getPost, updatePost, writePost } from '@/remote/postService'
import { useRouter } from 'next/router'

export function usePost({
  postId,
  userId,
}: {
  postId?: string
  userId?: string
}) {
  const client = useQueryClient()
  const router = useRouter()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery(
    ['post', { postId, userId }],
    async () => {
      if (postId) {
        return await getPost(postId)
      } else if (userId) {
        return await getMyPost({ userId }) // 항상 배열로 반환
      } else {
        return []
        // throw new Error('Either postId or userId must be provided.')
      }
    },
    {
      enabled: !!postId || !!userId,
    },
  )

  const { mutate: savePost, isLoading: isSaving } = useMutation(
    (newPost: Omit<PostProps, 'postId'>) =>
      postId ? updatePost(postId, newPost) : writePost(newPost),

    {
      onSuccess: () => {
        client.invalidateQueries(['post'])
        alert('Successfully added/updated post!')
        router.push('/community')
      },
      onError: (error: Error) => {
        console.error(error)
        alert('Failed to save the post. Please try again later.')
        router.push('/community')
      },
    },
  )

  return {
    post: postId
      ? (post as PostProps | null)
      : Array.isArray(post)
        ? (post as PostProps[]) // 배열로 캐스팅
        : [],
    isLoading,
    error,
    savePost,
    isSaving,
  }
}
