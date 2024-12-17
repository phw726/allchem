import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFirebaseCRUD } from './useFirebaseCRUD'

export function useData<T extends { postId?: string; userId?: string }>({
  collectionName,
  itemId,
  userId,
}: {
  collectionName: 'POST' | 'COMMENT' | 'LIKE' | 'BOOKMARK'
  itemId?: string | ''
  userId?: string
}) {
  const client = useQueryClient()
  const { fetchAll, fetchById, createWithUpdate, update, remove } =
    useFirebaseCRUD(collectionName)

  // Define query key
  const queryKey = itemId
    ? [collectionName.toLowerCase(), itemId]
    : userId
      ? [`${collectionName.toLowerCase()}sByUser`, userId]
      : [`${collectionName.toLowerCase()}s`]

  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      if (itemId) {
        return (await fetchById(itemId)) as T
      }
      if (userId) {
        return await fetchAll([
          { field: 'userId', operator: '==', value: userId },
        ])
      }

      return []
    },
    enabled: !!itemId || !!userId,
    initialData: [],
  })

  const saveItem = useMutation({
    mutationFn: async (newItem: T) => {
      if (newItem.postId) {
        await update(newItem.postId, newItem)
        return { id: newItem.postId }
      }
      const result = await createWithUpdate(newItem)
      return { id: result.id }
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey })
      alert(`${collectionName} saved successfully!`)
    },
    onError: (error: Error) => {
      console.error(
        `Error saving ${collectionName.toLowerCase()}:`,
        error.message,
      )
      alert(
        `Failed to save the ${collectionName.toLowerCase()}. Please try again.`,
      )
    },
  })

  const deleteItem = useMutation({
    mutationFn: async (id?: string) => {
      const itemIdToDelete = id || itemId
      if (!itemIdToDelete) throw new Error('Item ID is required for deletion.')
      await remove(itemIdToDelete)
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [`${collectionName.toLowerCase()}s`],
      })
      alert(`${collectionName} deleted successfully!`)
    },
    onError: error => {
      console.error(
        `Error deleting ${collectionName.toLowerCase()}:`,
        error.message,
      )
      alert(
        `Failed to delete the ${collectionName.toLowerCase()}. Please try again.`,
      )
    },
  })

  return {
    data,
    isLoading,
    error,
    saveItem: saveItem.mutate,
    deleteItem: deleteItem.mutate,
  }
}
