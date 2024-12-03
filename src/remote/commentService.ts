import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'
import { db } from '../../firebase'
import { COLLECTIONS } from '@/utils/constants'
import { CommentProps, PostProps } from '@/utils/types'

/// 특정 post의 comments 모두 보여주기 ///
export async function getComments({ postId }: { postId: string }) {
  const commentQuery = query(
    collection(db, COLLECTIONS.COMMENT),
    where('postId', '==', postId),
    orderBy('createdAt', 'desc'),
  )

  const commentSnap = await getDocs(commentQuery)

  return commentSnap.docs.map(doc => ({
    commentId: doc.id,
    ...(doc.data() as Omit<PostProps, 'postId'>),
  }))
}

/// 내가 쓴 댓글을 목록으로 뽑아서 보여주어야 함 ///
export async function getMyComments({
  postId,
  userId,
}: {
  postId: string
  userId: string
}): Promise<CommentProps[]> {
  const constraints = [where('userId', '==', userId)]

  // postId가 있으면 조건 추가
  if (postId) {
    constraints.push(where('postId', '==', postId))
  }

  const commentQuery = query(
    collection(db, COLLECTIONS.COMMENT),
    ...constraints,
    orderBy('createdAt', 'desc'),
  )

  const commentSnap = await getDocs(commentQuery)

  return commentSnap.docs.map(doc => ({
    ...(doc.data() as CommentProps),
    commentId: doc.id, // 댓글 ID를 추가
  }))
}

export async function writeComment(
  comment: Omit<CommentProps, 'commentId'>,
): Promise<void> {
  // const commentRef = await addDoc(collection(db, COLLECTIONS.COMMENT), comment)
  // return { commentId: commentRef.id }

  const postRef = await addDoc(collection(db, COLLECTIONS.COMMENT), comment)
}

export async function updateComment(
  commentId: string,
  comment: Omit<CommentProps, 'commentId'>,
) {
  if (!commentId) {
    throw new Error('Document ID is required for updating a comment.')
  }
  const docRef = doc(db, COLLECTIONS.COMMENT, commentId)
  return updateDoc(docRef, comment)
}

export async function removeComment(commentId: string) {
  const commentRef = doc(db, COLLECTIONS.COMMENT, commentId)
  return deleteDoc(commentRef)
}

// const commentQuery = query(
//   collection(db, COLLECTIONS.COMMENT),
//   where('userId', '==', userId),
//   orderBy('createdAt', 'desc'),
// )
