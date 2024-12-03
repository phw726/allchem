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
import { LikeProps, PostProps } from '@/utils/types'

export async function getLikes({ userId }: { userId: string }) {
  const likeSnap = await getDocs(
    query(
      collection(db, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    ),
  )

  return likeSnap.docs.map(doc => ({
    postId: doc.id,
    ...(doc.data() as Omit<LikeProps, 'postId'>),
  }))
}

export async function toggleLike({
  post,
  userId,
}: {
  post: Pick<PostProps, 'postId'>
  userId: string
}) {
  const likeId = `${userId}_${post.postId}`

  const findSnap = await getDocs(
    query(collection(db, COLLECTIONS.LIKE), where('likeId', '==', likeId)),
  )

  if (findSnap.docs.length > 0) {
    return deleteDoc(findSnap.docs[0].ref)
  } else {
    const newLike = {
      postId: post.postId,
      likeId,
      userId,
      createdAt: new Date().toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    return setDoc(doc(db, COLLECTIONS.LIKE, likeId), newLike)
  }
}

// const updateSnap = await getDocs(
//   query(
//     collection(db, COLLECTIONS.LIKE),
//     where('userId', '==', userId),
//     orderBy('createdAt', 'desc'),
//   ),
// )

// if (updateSnap.empty) {
//   return deleteDoc(removeLike.ref)
// } else {
//   const batch = writeBatch(db)

//   updateSnap.forEach(doc => {
//     batch.update(doc.ref, doc.data())
//   })

//   await batch.commit()
//   return deleteDoc(removeLike.ref)
// }
// } else {
// const lastLikeSnap = await getDocs(
//   query(
//     collection(db, COLLECTIONS.LIKE),
//     where('userId', '==', userId),
//     orderBy('createdAt', 'desc'),
//     limit(1),
//   ),
// )
