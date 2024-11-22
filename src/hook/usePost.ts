import { PostProps } from '@/utils/types'
import { useContext, useState } from 'react'
import AuthContext from './AuthContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getPost, getPosts, updatePost, writePost } from '@/remote/postService'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { useAuth } from './useAuth'

export function usePost(postId?: string) {
  const { user } = useAuth()
  const client = useQueryClient()
  const router = useRouter()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery(['post', postId], () => (postId ? getPost(postId) : null), {
    enabled: !!postId,
  })

  const { mutate: savePost, isLoading: isSaving } = useMutation(
    (newPost: Omit<PostProps, 'postId'>) =>
      postId ? updatePost(postId, newPost) : writePost(newPost),

    {
      onSuccess: () => {
        client.invalidateQueries(['posts'])
        alert('Successfully added/updated post!')
        router.push('/community')
      },
      onError: (error: Error) => {
        console.error(error)
        alert('Failed to save post. Please try again later.')
        router.push('/community')
      },
    },
  )
  return { post, isLoading, error, savePost, isSaving }
}
