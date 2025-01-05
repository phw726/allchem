import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  updateDoc,
  where,
} from '@firebase/firestore'
import { db } from '../../firebase'

export function useFirebaseCRUD<
  T extends {
    postId?: string | undefined
    userId?: string | undefined
    createdAt?: string
  },
>(collectionName: string) {
  const collectionRef = collection(db, collectionName)

  // 모든 문서 가져오기
  const fetchAll = async (
    filters: Array<{ field: string; operator: string; value: any }> = [],
  ): Promise<DocumentData[]> => {
    const constraints: QueryConstraint[] = []
    if (filters) {
      constraints.push(
        ...filters.map(filter =>
          where(filter.field, filter.operator as any, filter.value),
        ),
      )
    }
    constraints.push(orderBy('createdAt', 'desc'))

    const q = query(collectionRef, ...constraints)
    const snap = await getDocs(q)
    return snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  }

  // 특정 문서 가져오기
  const fetchById = async (id: string): Promise<DocumentData | null> => {
    const docRef = doc(collectionRef, id)

    const snap = await getDoc(docRef)
    return snap.exists() ? { ...snap.data(), id: snap.id } : null
  }

  const create = async (data: T): Promise<{ id: string }> => {
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date().toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    })
    return { id: docRef.id }
  }

  const createWithUpdate = async (data: T): Promise<{ id: string }> => {
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date().toLocaleDateString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    })
    await updateDoc(docRef, { postId: docRef.id })

    return { id: docRef.id }
  }
  // 문서 업데이트하기
  const update = async (id: string, data: T): Promise<void> => {
    const docRef = doc(collectionRef, id)
    await updateDoc(docRef, data)
  }

  // 문서 삭제하기
  const remove = async (id: string): Promise<void> => {
    if (!id) throw new Error('Document ID is required for deletion.')

    const docRef = doc(collectionRef, id)
    await deleteDoc(docRef)
  }

  const fetchPostandToggle = async (userId: string) => {
    const collectionToggle = collection(db, collectionName)

    const ToggleQuery = query(
      collectionToggle,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    )

    const toggleSnap = await getDocs(ToggleQuery)

    if (toggleSnap.empty) {
      return []
    }

    const togglePostId = toggleSnap.docs.map(doc => doc.data().postId)

    if (togglePostId.length === 0) {
      return []
    }

    const postChunk = []
    const chunkSize = 10
    const postRef = collection(db, 'POST')

    for (let i = 0; i < togglePostId.length; i += chunkSize) {
      const chunk = togglePostId.slice(i, i + chunkSize)
      const postQuery = query(postRef, where(documentId(), 'in', chunk))
      const postSnap = await getDocs(postQuery)
      postChunk.push(postSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }

    return postChunk.flat()
  }

  return {
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    fetchPostandToggle,
    createWithUpdate,
  }
}
