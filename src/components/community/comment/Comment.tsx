import React, { useContext, useEffect, useState } from 'react'
import * as S from './Comment.styles'
import { CommentType, PostProps } from '../postForm/PostForm'
import AuthContext from '../../../hook/AuthContext'
import { db } from '../../../../firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from '@firebase/firestore'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'

export interface CommentProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function Comment({ post, getPost }: CommentProps) {
  const [comment, setComment] = useState('')
  const [editComment, setEditComment] = useState('')
  const [editCommentId, setEditCommentId] = useState<string | null>(null)
  const { user } = useContext(AuthContext)
  const commentCount = post?.comments?.length || 0

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'comment') {
      setComment(value)
    } else if (name === 'editedComment') setEditComment(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post.id)

        if (user?.uid && user?.email) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString('en', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
          })

          await getPost(post.id)
        }
      }
      setComment('')
      alert('Comment added successfully!')
    } catch (e) {
      console.error('Error adding comment: ', e)
      alert('Failed to submit comment. Please try again later.')
    }
  }

  const handleCommentEdit = (comment: CommentType) => {
    setEditCommentId(comment.createdAt)
    setEditComment(comment.content)
  }

  const handleEditSubmit = async () => {
    if (!post.id || !user?.uid) return

    const postRef = doc(db, 'posts', post.id)
    const updatedComments = post.comments.map(comment => {
      if (comment.createdAt === editCommentId) {
        return {
          ...comment,
          content: editComment,
          updatedAt: new Date().toLocaleDateString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }
      }
      return comment
    })

    try {
      await updateDoc(postRef, { comments: updatedComments })
      await getPost(post.id)
      setEditCommentId(null)
      setEditComment('')
      alert('Comment edited successfully!')
    } catch (e) {
      console.error('Error editing comment: ', e)
      alert('Failed to edit comment. Please try again later.')
    }
  }

  const handleCommentDelete = async (data: CommentType) => {
    const confirm = window.confirm('Are you sure you want to delete comment?')
    if (confirm && post.id) {
      const postRef = doc(db, 'posts', post?.id)
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      })
      alert('Successfully deleted comment')

      await getPost(post.id)
    }
  }

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
          value={comment}
          onChange={onChange}
        />
        <S.SubmitBtn type="submit">Submit</S.SubmitBtn>
      </S.TextAreaWrapper>

      {post.comments &&
        post.comments
          .slice(0)
          ?.reverse()
          .map(comment => (
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
              {editCommentId === comment.createdAt ? (
                <>
                  <S.CommentText
                    placeholder="Edit your comment..."
                    name="editedComment"
                    id="editedComment"
                    required
                    value={editComment}
                    onChange={onChange}
                  />
                  <S.CommentUtils>
                    <S.SubmitBtn_s type="button" onClick={handleCancelEdit}>
                      Cancel
                    </S.SubmitBtn_s>
                    <S.SubmitBtn_s type="button" onClick={handleEditSubmit}>
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
