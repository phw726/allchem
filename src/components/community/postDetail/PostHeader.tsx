import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from '@firebase/firestore'
import { useRouter } from 'next/router'
import { db } from '../../../../firebase'
import { PostProps } from '@/utils/types'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { BsList } from 'react-icons/bs'
import * as S from './PostDetailForm.styles'

export default function PostHeader({ createdAt }: { createdAt: string }) {
  const router = useRouter()

  const fetchPrev = async () => {
    const postRef = collection(db, 'POST')
    const postQuery = query(
      postRef,
      where('createdAt', '<', createdAt),
      orderBy('createdAt', 'desc'),
      limit(1),
    )
    const querySnapshot = await getDocs(postQuery)
    if (!querySnapshot.empty) {
      const prevPostDoc = querySnapshot.docs[0]
      const prevPost = {
        id: prevPostDoc.id,
        ...(prevPostDoc.data() as PostProps),
      }
      router.push(`/community/${prevPost.id}`)
    } else {
      alert('No Post')
    }
  }

  const fetchNext = async () => {
    const postRef = collection(db, 'posts')
    const postQuery = query(
      postRef,
      where('createdAt', '>', createdAt),
      orderBy('createdAt', 'asc'),
      limit(1),
    )
    const querySnapshot = await getDocs(postQuery)
    if (!querySnapshot.empty) {
      const nextPostDoc = querySnapshot.docs[0]
      const nextPost = {
        id: nextPostDoc.id,
        ...(nextPostDoc.data() as PostProps),
      }
      router.push(`/community/${nextPost.id}`)
    } else {
      alert('Last Post')
    }
  }

  return (
    <S.PostHeaderWrapper>
      <S.Arrow type="button" onClick={fetchPrev}>
        <FaAngleLeft />
        Prev
      </S.Arrow>
      {/* <S.List href="/community">
        <BsList />
        List
      </S.List> */}
      <S.Arrow onClick={fetchNext}>
        Next
        <FaAngleRight />
      </S.Arrow>
    </S.PostHeaderWrapper>
  )
}
