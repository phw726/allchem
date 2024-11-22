import { PostProps } from '@/utils/types'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
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

// export async function getPost() {

//   const postRef = doc(db, COLLECTIONS.POST, 'id')

//   const postQuery = query(collection(postRef, COLLECTIONS.POST), orderBy('createdAt','desc'))

//   const postSnap = await getDocs(postQuery)

//   const posts = postSnap.docs.map((doc) => {
//     const post = doc.data()
//     return {
//       id: doc.id,
//       ...posts,
//       createAt: post.createdAt.newData().toLocaleDateString('en', {
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//       }

//       title: title,
//       content: content,
//       file: fileUrls,
//       updatedAt: new Date()?),
//       category,
//     }
//   })

//     if (postSnap.exists()) {
//       const postData = { id: postSnap.id, ...(postSnap.data() as PostProps) }
//       setPost(postData)

//       setTitle(postData.title)
//       setContent(postData.content)
//       setCategory(postData.category as PostCategoryType)

//       if (postData.files) {
//         const postFiles = postData.files.map(
//           fileUrl =>
//             ({
//               preview: fileUrl,
//             }) as FileWithPreview,
//         )
//         setFiles(postFiles)
//       }
//     }

// }

export async function writePost(
  post: Omit<PostProps, 'postId'>,
): Promise<void> {
  const postRef = await addDoc(collection(db, COLLECTIONS.POST), post)
}
// 기존 게시글 수정
export async function updatePost(
  postId: string,
  post: Omit<PostProps, 'postId'>,
) {
  if (!postId) {
    throw new Error('Document ID is required for updating a post.')
  }
  const docRef = doc(db, COLLECTIONS.POST, postId)
  return await updateDoc(docRef, post)
}
export async function removePost(postId: string) {
  const postRef = doc(db, COLLECTIONS.POST, postId)
  return deleteDoc(postRef)
}
