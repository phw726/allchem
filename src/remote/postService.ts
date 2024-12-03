import { PostProps } from '@/utils/types'
import { db } from '../../firebase'
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
import { COLLECTIONS } from '@/utils/constants'

export async function getPosts(category?: string): Promise<PostProps[]> {
  let postQuery

  // 카테고리가 'All'이 아니면 where 조건 추가
  if (category && category !== 'All') {
    postQuery = query(
      collection(db, COLLECTIONS.POST),
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
    )
  } else {
    // 'All'인 경우 where 없이 orderBy만 사용
    postQuery = query(
      collection(db, COLLECTIONS.POST),
      orderBy('createdAt', 'desc'),
    )
  }
  // getDocs -> 비동기 -> await
  const postSnap = await getDocs(postQuery)

  return postSnap.docs.map(doc => ({
    postId: doc.id,
    ...(doc.data() as Omit<PostProps, 'postId'>),
  }))
}

export async function getPost(
  postId: string,
): Promise<(PostProps & { postId: string }) | null> {
  const postRef = doc(db, COLLECTIONS.POST, postId)

  const postSnap = await getDoc(postRef)

  if (postSnap.exists()) {
    return {
      ...(postSnap.data() as PostProps),
      postId: postSnap.id,
    }
  }
  return null
}

export async function getMyPost({
  postId,
  userId,
}: {
  postId?: string
  userId?: string
}): Promise<PostProps[]> {
  const constants = [where('userId', '==', userId)]

  if (postId) {
    constants.push(where('postId', '==', postId))
  }

  const postQuery = query(
    collection(db, COLLECTIONS.POST),
    ...constants,
    orderBy('createdAt', 'desc'),
  )

  const postSnap = await getDocs(postQuery)

  return postSnap.docs.map(doc => ({
    ...(doc.data() as PostProps),
    postId: doc.id,
  }))
}

export async function writePost(
  post: Omit<PostProps, 'postId'>,
): Promise<{ postId: string }> {
  const postWithUserID = { ...post, userId: post.uid }
  const postRef = await addDoc(collection(db, COLLECTIONS.POST), postWithUserID)
  return { postId: postRef.id }
}
// 기존 게시글 수정
export async function updatePost(
  postId: string,
  post: Omit<PostProps, 'postId'>,
): Promise<{ postId: string }> {
  if (!postId) {
    throw new Error('Document ID is required for updating a post.')
  }

  const postWithUserID = { ...post, userId: post.uid }

  const docRef = doc(db, COLLECTIONS.POST, postId)
  await updateDoc(docRef, postWithUserID)
  return { postId }
}

export async function removePost(postId: string) {
  const postRef = doc(db, COLLECTIONS.POST, postId)
  return deleteDoc(postRef)
}
