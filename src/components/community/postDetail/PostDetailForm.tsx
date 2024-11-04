import React, { useContext, useEffect, useState } from 'react'
import * as S from './PostDetailForm.styles'
import { useRouter } from 'next/router'
import { PostProps } from '../postForm/PostForm'
import { deleteDoc, doc, getDoc } from '@firebase/firestore'
import { db } from '../../../../firebase'
import PostHeader from './PostHeader'
import AuthContext from '@/context/AuthContext'
import 'react-quill/dist/quill.snow.css'
import Comment from '../comment/Comment'

export default function PostDetailForm() {
  const [post, setPost] = useState<PostProps | null>(null)
  const router = useRouter()
  const { postId } = router.query
  const { user } = useContext(AuthContext)

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) })
      }
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete?')

    try {
      if (confirm && post && post.id) {
        await deleteDoc(doc(db, 'posts', post.id))
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
    if (typeof postId === 'string') getPost(postId)
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
              <S.Info>
                {post.updatedAt || post.createdAt}{' '}
                {post.updatedAt && '(Edited)'}
              </S.Info>

              <span>
                <S.Info>{post.email}</S.Info>

                {post?.email === user?.email && (
                  <S.PostUtilsWrapper>
                    <S.Edit href={`/community/post/edit/${post?.id}`}>
                      Edit
                    </S.Edit>
                    <S.Delete onClick={handleDelete}>Delete</S.Delete>
                  </S.PostUtilsWrapper>
                )}
              </span>
            </S.PostInfo>

            {post.content && (
              <S.Content>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </S.Content>
            )}
            <Comment post={post} getPost={getPost} />
          </S.PostWrapper>
        </>
      ) : (
        'loading...'
      )}
    </S.Wrapper>
  )
}
