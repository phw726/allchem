import {
  getComments,
  updateComment,
  writeComment,
} from '@/remote/commentService'
import { CommentProps } from '@/utils/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function usePostComments(postId: string) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery(['comments', postId], () => getComments({ postId }), {
    enabled: !!postId,
  })

  return { comments, isLoading, error }
}

export function useUserComment(commentId?: string) {
  const client = useQueryClient()

  const { mutate, isLoading, error } = useMutation(
    (newComment: Omit<CommentProps, 'commentId'>) =>
      commentId
        ? updateComment(commentId, newComment)
        : writeComment(newComment),
    {
      onSuccess: () => {
        client.invalidateQueries(['comments'])
        alert('Successfully added/updated post!')
      },
      onError: (error: Error) => {
        alert('Failed to update the comment. Please try again later.')
        console.error(error)
      },
    },
  )

  return { mutate, isLoading, error }
}
