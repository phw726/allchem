import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFirebaseCRUD } from './useFirebaseCRUD'
import { CommentProps } from '@/utils/types'

export function useComment(postId?: string, userId?: string) {
  const client = useQueryClient()
  const { fetchAll, create, update, remove } = useFirebaseCRUD('COMMENT')

  // 특정 게시글의 댓글 조회
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () =>
      await fetchAll([{ field: 'postId', operator: '==', value: postId }]),
    enabled: !!postId,
  })

  // 특정 유저가 작성한 댓글 조회
  const { data: userComments = [] } = useQuery({
    queryKey: ['userComments', userId],
    queryFn: async () =>
      userId
        ? await fetchAll([{ field: 'userId', operator: '==', value: userId }])
        : [],
    enabled: !!userId,
  })

  const saveComment = useMutation({
    mutationFn: async (comment: CommentProps) => {
      if (comment.commentId) {
        await update(comment.commentId, comment)
      } else {
        const result = await create(comment)
        const updatedComment = { ...comment, commentId: result.id }
        await update(result.id, updatedComment)
        return { commentId: result.id }
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['comments', postId] })
      client.invalidateQueries({ queryKey: ['userComments', userId] })
    },
  })

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      await remove(commentId)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['comments', postId] })
      client.invalidateQueries({ queryKey: ['userComments', userId] })
    },
  })

  return {
    comments,
    userComments,
    saveComment: saveComment.mutate,
    deleteComment: deleteComment.mutate,
  }
}
