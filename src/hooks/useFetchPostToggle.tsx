import { useEffect, useState } from 'react'
import { useFirebaseCRUD } from './useFirebaseCRUD'

export function useFetchToggledPost({
  userId,
  collectionName,
}: {
  userId: string
  collectionName: 'LIKE' | 'BOOKMARK'
}) {
  const { fetchPostandToggle } = useFirebaseCRUD(collectionName)
  const [posts, setPosts] = useState<{ id: string; [key: string]: any }[]>([])

  useEffect(() => {
    if (!userId) {
      setPosts([])
      return
    }

    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPostandToggle(userId)

        setPosts(fetchedPosts)
      } catch (err: any) {
        console.error('Failed to fetch posts:', err.message)
      }
    }

    fetchData()
  }, [userId, collectionName]) // userId와 collectionName 의존성 추가

  return { posts }
}
