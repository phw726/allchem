import React, { useContext, useEffect, useState } from 'react'
import * as S from './PostDetailForm.styles'
import { useRouter } from 'next/router'
import * as postService from '@/remote/postService'
import PostHeader from './PostHeader'
import AuthContext from '../../../hook/AuthContext'
import 'react-quill/dist/quill.snow.css'
import Comment from '../comment/Comment'
import PostUtils from './postUtils/PostUtils'
import { PostProps } from '@/utils/types'
import { useAuth } from '@/hook/useAuth'

export default function PostDetailForm() {
  const [post, setPost] = useState<PostProps | null>(null)
  const router = useRouter()
  const { postId } = router.query
  const { user } = useAuth()

  const fetchPost = async (id: string) => {
    try {
      const fetchData = await postService.getPost(id)
      if (fetchData) setPost(fetchData)
    } catch (err) {
      console.log('FetchPost Error:', err)
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete?')

    try {
      if (confirm && post && postId) {
        await postService.removePost(postId as string)
        alert('Successfully deleted')
        router.push('/community')
      }
    } catch (e: any) {
      console.log(e)
      alert('Failed to submit post. Please try again later')
    }
  }

  useEffect(() => {
    ////params?.id의 타입이 string | string[] -> getPost 함수에서 id를 직접 사용할 수 없음.
    ////params?.id가 배열일 경우 첫 번째 값을 사용하도록 처리
    if (typeof postId === 'string') {
      postService
        .getPost(postId)
        .then(fetchData => {
          if (fetchData) {
            setPost(fetchData)
          }
        })
        .catch(err => {
          console.log(err)
          alert('Failed to fetch post')
          router.push('/community')
        })
    }
  }, [postId])

  return (
    <S.Wrapper>
      {post ? (
        <>
          <PostHeader createdAt={post.createdAt} />
          <S.PostWrapper>
            <S.Title>
              <S.Category>{post.category}</S.Category>
              {post.title}
            </S.Title>
            <S.PostInfo>
              <span>
                <S.Info>{post.email}</S.Info>

                {post?.email === user?.email && (
                  <S.PostUtilsWrapper>
                    <S.Edit href={`/community/post/edit/${postId}`}>
                      Edit
                    </S.Edit>
                    <S.Delete onClick={handleDelete}>Delete</S.Delete>
                  </S.PostUtilsWrapper>
                )}
              </span>

              <S.Info>
                {post.updatedAt || post.createdAt}{' '}
                {post.updatedAt && '(Edited)'}
              </S.Info>
            </S.PostInfo>

            {post.content && (
              <S.Content>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </S.Content>
            )}
            <PostUtils post={post} getPost={fetchPost} />
            <Comment post={post} getPost={fetchPost} />
          </S.PostWrapper>
        </>
      ) : (
        'loading...'
      )}
    </S.Wrapper>
  )
}
