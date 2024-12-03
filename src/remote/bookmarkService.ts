import { BookMarkProps, PostProps } from '@/utils/types'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from '@firebase/firestore'
import { db } from '../../firebase'
import { COLLECTIONS } from '@/utils/constants'

export async function getBooks({
  userId,
  postId,
}: {
  userId?: string
  postId?: string
}): Promise<BookMarkProps[]> {
  const constraints = [where('userId', '==', userId)]

  if (postId) {
    constraints.push(where('postId', '==', postId))
  }

  const snapShot = await getDocs(
    query(
      collection(db, COLLECTIONS.BOOKMARK),
      ...constraints,
      orderBy('createdAt', 'desc'),
    ),
  )

  return snapShot.docs.map(doc => ({
    ...(doc.data() as BookMarkProps),
  }))
}

export async function getMyBookmark({
  userId,
}: {
  userId?: string
}): Promise<BookMarkProps[]> {
  if (!userId) {
    throw new Error('userId is required to fetch bookmarks')
  }

  const bookQuery = query(
    collection(db, COLLECTIONS.BOOKMARK),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  )

  const bookSnap = await getDocs(bookQuery)
  return bookSnap.docs.map(doc => ({
    ...(doc.data() as BookMarkProps),
  }))
}

export async function toggleBook({
  post,
  userId,
}: {
  post: Pick<PostProps, 'postId'>
  userId: string
}) {
  const findSnap = await getDocs(
    query(
      collection(db, COLLECTIONS.BOOKMARK),
      where('posdtId', '==', post.postId),
      where('userId', '==', userId),
    ),
  )

  if (findSnap.docs.length > 0) {
    return deleteDoc(findSnap.docs[0].ref)
  } else {
    const newBook = {
      postId: post.postId,
      userId,
      createdAt: new Date().toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    return setDoc(doc(collection(db, COLLECTIONS.BOOKMARK)), newBook)
  }
}
