import React from 'react'
import { create } from 'zustand'

type SearchState = {
  searchWrd: string
  setSearchWrd: (value: string) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchState>(set => ({
  searchWrd: '',
  setSearchWrd: value => set({ searchWrd: value }),
  clearSearch: () => set({ searchWrd: '' }),
}))
