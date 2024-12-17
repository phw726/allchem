import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFirebaseCRUD } from './useFirebaseCRUD'
import { PostProps } from '@/utils/types'

export function usePost(postId?: string, userId?: string) {
  const client = useQueryClient()
  const { fetchAll, fetchById, create, update, remove } =
    useFirebaseCRUD('POST')

  const { data: posts = [] } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => (userId ? await fetchAll([]) : []),
    enabled: !!postId,
  })

  const { data: postDetail } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: async () => (postId ? await fetchById(postId) : null),
    enabled: !!postId,
  })

  const { data: userPosts = [] } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: async () =>
      userId
        ? await fetchAll([{ field: 'userId', operator: '==', value: userId }])
        : [],
    enabled: !!userId,
  })

  const savePost = useMutation({
    mutationFn: async (post: PostProps) => {
      if (postId) {
        await update(postId, post)
      } else {
        const result = await create(post)
        const updatedPost = { ...post, postId: result.id }
        await update(result.id, updatedPost)
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts', postId] })
      client.invalidateQueries({ queryKey: ['userPosts', userId] })
    },
    onError: (error: Error) => {
      console.error(`Error saving post:`, error)
    },
  })

  const deletePost = useMutation({
    mutationFn: async (postId: string) => await remove(postId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['posts'] })
      client.invalidateQueries({ queryKey: ['userPosts'] })
    },
    onError: (error: Error) => {
      console.error(`Error deleting post:`, error)
    },
  })

  return {
    posts,
    postDetail,
    userPosts,
    savePost: savePost.mutate,
    deletePost: deletePost.mutate,
  }
}
