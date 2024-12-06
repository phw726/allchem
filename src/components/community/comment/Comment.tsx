import React, { useState } from 'react'
import * as S from './Comment.styles'
import * as commentService from '@/remote/commentService'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import { usePostComments } from '@/hooks/useComment'
import { useRouter } from 'next/router'
import { CommentProps, PostProps } from '@/utils/types'
import { useAuth } from '@/hooks/useAuth'

export interface FetchProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function Comment({ post, getPost }: FetchProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { postId } = router.query as { postId: string }
  const { comments, isLoading } = usePostComments(post.postId)

  const [newComment, setNewComment] = useState('')
  const [editComment, setEditComment] = useState('')
  const [editCommentId, setEditCommentId] = useState<string | null>(null)

  const commentCount = comments?.length || 0

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      alert('Please log in to leave a comment.')
      return
    }
    if (!postId) {
      alert('Post ID is required to submit a comment.')
      return
    }

    const data = {
      email: user.email,
      postId: postId!,
      content: newComment,
      uid: user.uid,
      createdAt: new Date()?.toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    try {
      await commentService.writeComment(data)
      alert('Comment created successfully!')
      setNewComment('') // Clear input field
      getPost(postId!) // Refresh post data
    } catch (e) {
      console.error('Error adding comment: ', e)
      alert('Failed to submit comment. Please try again later.')
    }
  }

  const handleEditSubmit = async (comment: CommentProps) => {
    if (!editCommentId) return

    const updatedComment = {
      postId,
      email: user?.email,
      uid: user?.uid as string,
      createdAt: comment.createdAt,
      content: editComment,
      updatedAt: new Date()?.toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    try {
      await commentService.updateComment(editCommentId, updatedComment)
      alert('Comment updated successfully!')
      setEditComment('')
      setEditCommentId(null)
      getPost(postId!) // Refresh post data
    } catch (e) {
      console.error('Error updating comment: ', e)
      alert('Failed to update comment. Please try again later.')
    }
  }

  const handleCommentEdit = (comment: CommentProps) => {
    setEditCommentId(comment.commentId as string)
    setEditComment(comment.content)
  }

  const handleCancelEdit = () => {
    setEditCommentId(null)
    setEditComment('')
  }

  const handleCommentDelete = async (comment: CommentProps) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this comment?',
    )
    if (confirm && comment.commentId) {
      try {
        await commentService.removeComment(comment.commentId)
        alert('Comment deleted successfully!')
        getPost(post.postId) // Refresh post data
      } catch (e) {
        console.error('Error deleting comment: ', e)
        alert('Failed to delete comment. Please try again later.')
      }
    }
  }

  return (
    <S.Wrapper>
      <S.TotalText>{commentCount} Comments</S.TotalText>
      <S.TextAreaWrapper onSubmit={handleSubmit}>
        <S.CommentText
          placeholder="Leave a Comment..."
          name="comment"
          id="comment"
          required
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <S.SubmitBtn type="submit">Submit</S.SubmitBtn>
      </S.TextAreaWrapper>

      {comments &&
        comments.map(comment => (
          <S.ListWrapper key={comment.createdAt}>
            <S.UserInfo>
              <S.Email>{comment.email}</S.Email>
              <S.Date>
                {comment?.updatedAt || comment.createdAt}
                {comment.updatedAt && '(Edit)'}
              </S.Date>
              {comment.uid === user?.uid &&
                editCommentId !== comment.createdAt && (
                  <S.UtilsWrapper>
                    <S.EditBtn
                      type="button"
                      onClick={() => handleCommentEdit(comment)}
                    >
                      <CiEdit />
                    </S.EditBtn>
                    <S.DeleteBtn
                      type="button"
                      onClick={() => handleCommentDelete(comment)}
                    >
                      <AiOutlineDelete />
                    </S.DeleteBtn>
                  </S.UtilsWrapper>
                )}
            </S.UserInfo>
            {editCommentId === comment.commentId ? (
              <>
                <S.CommentText
                  placeholder="Edit your comment..."
                  name="editedComment"
                  id="editedComment"
                  required
                  value={editComment}
                  onChange={e => setEditComment(e.target.value)}
                />
                <S.CommentUtils>
                  <S.SubmitBtn_s type="button" onClick={handleCancelEdit}>
                    Cancel
                  </S.SubmitBtn_s>
                  <S.SubmitBtn_s
                    type="button"
                    onClick={() => handleEditSubmit(comment)}
                  >
                    Save
                  </S.SubmitBtn_s>
                </S.CommentUtils>
              </>
            ) : (
              <S.Comment>{comment.content}</S.Comment>
            )}
          </S.ListWrapper>
        ))}
    </S.Wrapper>
  )
}
