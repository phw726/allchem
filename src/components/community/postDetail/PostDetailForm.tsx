import * as S from './PostDetailForm.styles'
import { useRouter } from 'next/router'
import PostHeader from './PostHeader'
import 'react-quill/dist/quill.snow.css'
import Comment from '../comment/Comment'
import PostUtils from './postUtils/PostUtils'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { usePost } from '@/hooks/usePost'

export default function PostDetailForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { postId } = router.query as { postId: string }

  const { postDetail: post, deletePost } = usePost({ postId })

  useEffect(() => {
    if (!post) {
      console.log('Loading post data...')
    }
  }, [post])

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete?')

    if (confirm && postId && user?.uid === post?.userId) {
      try {
        await deletePost(postId)
        router.push('/community')
      } catch (e: any) {}
    }
  }

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
            <PostUtils postId={postId} />
            <Comment />
          </S.PostWrapper>
        </>
      ) : (
        'loading...'
      )}
    </S.Wrapper>
  )
}
