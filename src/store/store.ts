import { create } from 'zustand'

import { FilterEnum } from '../shared/enums'
import type { FileData } from '../shared/types'
import * as DB from '../utils/db'

interface FileStoreState {
  fileList: FileData[]
  setFileList: (fileList: FileData[]) => void
  loadAllMetadata: () => Promise<void>
  searchQuery: string
  setSearchQuery: (query: string) => void
  filter: FilterEnum
  setFilter: (filter: FilterEnum) => void
}

interface SnackbarStoreState {
  visible: boolean
  setVisible: (visible: boolean) => void
}

interface SnackbarMessageStoreState {
  message: { action: string; text: string }
  setMessage: (message: { action: string; text: string }) => void
}

export const useFileStore = create<FileStoreState>((set) => ({
  fileList: [],
  setFileList: (fileList) => set({ fileList }),
  loadAllMetadata: async () => {
    set({ fileList: await DB.getFiles() })
  },
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  filter: FilterEnum.TitleAsc,
  setFilter: (filter: FilterEnum) => set({ filter })
}))

export const useSnackbarStore = create<SnackbarStoreState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible })
}))

export const useSnackbarMessageStore = create<SnackbarMessageStoreState>(
  (set) => ({
    message: { action: '', text: '' },
    setMessage: (message) => set({ message })
  })
)
