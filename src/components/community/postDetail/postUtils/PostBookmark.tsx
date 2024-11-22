import React, { useContext, useEffect, useState } from 'react'
import * as S from './postUtils.styles'

import AuthContext from '../../../../hook/AuthContext'
import { PostProps } from '../../postForm/PostForm'
import { db } from '../../../../../firebase'
import { arrayUnion, doc, updateDoc } from '@firebase/firestore'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

export interface BookMarkProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function PostBookmark({ post, getPost }: BookMarkProps) {
  const [isSave, setIsSave] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user?.uid && post.bookmarks) {
      const userSaved = post.bookmarks.some(
        bookmark => bookmark.uid === user.uid,
      )
      setIsSave(userSaved)
    }
  }, [user, post.likes])

  const toggleSave = async () => {
    if (!user) {
      alert('Please use after signing in.')
      return
    }

    if (post && post.id) {
      try {
        const SaveRef = doc(db, 'posts', post.id)

        const SaveObj = {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toLocaleDateString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }

        // bookmark 취소

        if (isSave) {
          const updatedMark = (post.bookmarks || []).filter(
            bookmark => bookmark.uid !== user.uid,
          )
          await updateDoc(SaveRef, { bookmarks: updatedMark })
          setIsSave(false)
          alert('Removed  to bookmark list successfully')
        } else {
          // like 추가
          await updateDoc(SaveRef, {
            bookmarks: arrayUnion(SaveObj),
          })

          setIsSave(true)
          alert('Added to bookmark list successfully.')
        }

        await getPost(post.id)
      } catch (e) {
        console.log(e)
        alert('Failed to create Bookmark. Please try again later')
      }
    }
  }
  return (
    <S.UtilBtn type="button" onClick={toggleSave} $active={isSave}>
      {isSave ? <FaBookmark /> : <FaRegBookmark />}
    </S.UtilBtn>
  )
}
