import React, { useState } from 'react'
import * as S from './Comment.styles'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { CommentProps } from '@/utils/types'
import { useAuth } from '@/hooks/useAuth'
import { useComment } from '@/hooks/useComment'

export default function Comment() {
  const router = useRouter()
  const { postId } = router.query as { postId: string }
  const { user } = useAuth()

  const { comments = [], saveComment, deleteComment } = useComment(postId)

  const [newComment, setNewComment] = useState('')
  const [editComment, setEditComment] = useState('')
  const [editCommentId, setEditCommentId] = useState<string | null>(null)

  const commentCount = comments?.length || 0

  // 댓글 작성
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      alert('Please log in to leave a comment.')
      return
    }

    const commentData: CommentProps = {
      email: user.email || '',
      postId,
      content: newComment,
      userId: user.uid,
      commentId: '', // Firestore에서 생성
      createdAt: new Date()?.toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    try {
      await saveComment(commentData)
      setNewComment('')
      alert('Comment submitted successfully!')
    } catch (error) {
      console.error('Failed to submit comment:', error)
      alert('Failed to submit comment. Please try again.')
    }
  }

  // 댓글 수정
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!editCommentId || !user) return

    const existingComment = comments.find(
      comment => comment.commentId === editCommentId,
    )

    if (!existingComment) {
      console.error('Original comment not found for editing.')
      return
    }

    const updatedComment: CommentProps = {
      ...existingComment,
      postId,
      userId: user.uid,
      createdAt: existingComment.createdAt,
      content: editComment,
      updatedAt: new Date()?.toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    try {
      await saveComment(updatedComment)
      setEditComment('')
      setEditCommentId(null)
      alert('Comment updated successfully!')
    } catch (error) {
      console.error('Failed to update comment:', error)
      alert('Failed to update comment. Please try again.')
    }
  }
  // 댓글 삭제
  const handleCommentDelete = async (commentId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment?',
    )

    if (confirmDelete) {
      try {
        await deleteComment(commentId)
        alert('Comment deleted successfully!')
      } catch (error) {
        console.error('Failed to delete comment:', error)
        alert('Failed to delete comment. Please try again.')
      }
    }
  }

  // 수정 모드 활성화
  const handleCommentEdit = (commentId: string, content: string) => {
    setEditCommentId(commentId)
    setEditComment(content)
  }

  // 수정 모드 취소
  const handleCancelEdit = () => {
    setEditCommentId(null)
    setEditComment('')
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

      {Array.isArray(comments) &&
        comments.map(comment => (
          <S.ListWrapper key={comment.createdAt}>
            <S.UserInfo>
              <S.Email>{comment.email}</S.Email>
              <S.Date>
                {comment?.updatedAt || comment.createdAt}
                {comment.updatedAt && '(Edit)'}
              </S.Date>
              {comment.userId === user?.uid &&
                editCommentId !== comment.createdAt && (
                  <S.UtilsWrapper>
                    <S.EditBtn
                      type="button"
                      onClick={() =>
                        handleCommentEdit(comment.commentId, comment.content)
                      }
                    >
                      <CiEdit />
                    </S.EditBtn>
                    <S.DeleteBtn
                      type="button"
                      onClick={() => handleCommentDelete(comment.commentId)}
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
                    onClick={() => handleEditSubmit(comment.content)}
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
