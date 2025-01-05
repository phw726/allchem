import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { useFirebaseCRUD } from './useFirebaseCRUD'

export function useToggleItem(
  collectionName: 'LIKE' | 'BOOKMARK',
  postId: string,
) {
  const { user } = useAuth()
  const client = useQueryClient()
  const { fetchAll, create, remove } = useFirebaseCRUD(collectionName)

  const invalidateQueries = (keys: Array<string | (string | undefined)[]>) => {
    keys.forEach(key =>
      client.invalidateQueries({
        queryKey: key,
      }),
    )
  }

  const { data: toggleCount = 0 } = useQuery<number>({
    queryKey: [`${collectionName}_count`, postId],
    queryFn: async () => {
      const toggleItem = await fetchAll([
        { field: 'postId', operator: '==', value: postId },
      ])
      return toggleItem.length
    },
  })

  const { data: isToggled = false } = useQuery<boolean>({
    queryKey: [`${collectionName}_status`, user?.uid, postId],
    queryFn: async () => {
      if (!user) return false
      const toggleItem = await fetchAll([
        { field: 'postId', operator: '==', value: postId },
        { field: 'userId', operator: '==', value: user.uid },
      ])
      return toggleItem.length > 0
    },
    enabled: !!user,
  })

  const { data: userToggledItems = [] } = useQuery({
    queryKey: [`${collectionName}_list`, user?.uid],
    queryFn: async () => {
      if (!user) return []
      return await fetchAll([
        { field: 'userId', operator: '==', value: user.uid },
      ])
    },
    enabled: !!user,
  })

  const { mutate: toggleItem } = useMutation({
    mutationFn: async () => {
      if (!user)
        throw new Error(`User must be logged in to toggle ${collectionName}.`)

      if (isToggled) {
        const toggledItem = await fetchAll([
          { field: 'postId', operator: '==', value: postId },
          { field: 'userId', operator: '==', value: user.uid },
        ])
        if (toggledItem.length > 0) {
          await remove(toggledItem[0].id) // Remove the toggle
          return { action: 'removed', postId }
        }
      } else {
        await create({
          userId: user.uid,
          postId,
          createdAt: new Date().toLocaleDateString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }) // Add the toggle
        return { action: 'added', postId }
      }
    },

    onSuccess: result => {
      const keysToInvalidate = [
        [collectionName],
        [`${collectionName}_list`, user?.uid],
        [`${collectionName}_count`, postId],
        [`${collectionName}_status`, user?.uid, postId],
      ]

      invalidateQueries(keysToInvalidate)

      const actionMessage =
        result?.action === 'removed'
          ? `${collectionName} removed successfully!`
          : `${collectionName} saved successfully!`
      alert(actionMessage)
    },
    onError: (error: Error) => {
      alert(`Failed to save the ${collectionName}. Please try again.`)
    },
  })

  return {
    toggleCount,
    isToggled,
    toggleItem,
    userToggledItems,
  }
}
