import { create } from 'zustand'

import { FilterEnum, SnackbarMode } from '../shared/enums'
import type { FileData, SheetMetadata } from '../shared/types'
import * as DB from '../utils/db'

interface FileStoreState {
  initFilter: () => Promise<void>
  fileList: FileData[]
  setFileList: (fileList: FileData[]) => void
  loadAllMetadata: () => Promise<void>
  filter: FilterEnum
  setFilter: (filter: FilterEnum) => void
}

interface SearchBarStoreState {
  visible: boolean
  setVisible: (visible: boolean) => void
  close: () => void
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
}

interface SnackbarStoreState {
  visible: boolean
  setVisible: (visible: boolean) => void
  duration: number
  setDuration: (duration: number) => void
  mode: SnackbarMode
  setMode: (mode: SnackbarMode) => void
}

interface SnackbarMessageStoreState {
  message: { action: string; text: string }
  setMessage: (message: { action: string; text: string }) => void
}

interface DetailsModalStoreState {
  visible: boolean
  setVisible: (visible: boolean) => void
  sheetName: string
  setSheetName: (sheetName: string) => void
  composer: string
  setComposer: (composer: string) => void
  fileUri: string
  setFileUri: (fileUri: string) => void
  handleSave: (metadata: SheetMetadata) => void
  setHandleSave: (handleSave: (metadata: SheetMetadata) => void) => void
}

interface StreakStoreState {
  initStreak: () => Promise<void>
  streak: number
  setStreak: (streak: number) => void
  streakVisible: boolean
  setStreakVisible: (streakVisible: boolean) => void
  streakAllowed: boolean
  setStreakAllowed: (streakAllowed: boolean) => void
}

export const useFileStore = create<FileStoreState>((set) => ({
  fileList: [],
  setFileList: (fileList) => set({ fileList }),
  loadAllMetadata: async () => {
    set({ fileList: await DB.getFiles() })
  },
  initFilter: async () => {
    const filter = await DB.getFilter()
    set({ filter })
  },
  filter: FilterEnum.TitleAsc,
  setFilter: async (filter: FilterEnum) => {
    await DB.setFilter(filter)
    set({ filter })
  }
}))

export const useSearchBarStore = create<SearchBarStoreState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible }),
  close: () => {
    set({ visible: false, searchQuery: '' })
  },
  searchQuery: '',
  setSearchQuery: (searchQuery: string) => set({ searchQuery })
}))

export const useSnackbarStore = create<SnackbarStoreState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible }),
  duration: 3000,
  setDuration: (duration) => set({ duration }),
  mode: SnackbarMode.Success,
  setMode: (mode) => set({ mode })
}))

export const useSnackbarMessageStore = create<SnackbarMessageStoreState>(
  (set) => ({
    message: { action: '', text: '' },
    setMessage: (message) => set({ message })
  })
)

export const useDetailsModalStore = create<DetailsModalStoreState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible }),
  sheetName: '',
  setSheetName: (sheetName) => set({ sheetName }),
  composer: '',
  setComposer: (composer) => set({ composer }),
  fileUri: '',
  setFileUri: (fileUri) => set({ fileUri }),
  handleSave: () => {},
  setHandleSave: (handleSave) => set({ handleSave })
}))

export const useStreakStore = create<StreakStoreState>((set) => ({
  initStreak: async () => {
    const streak = await DB.getStreak()
    set({ streak })

    const streakAllowed = await DB.getStreakAllowed()
    set({ streakAllowed })
  },
  streak: 0,
  setStreak: async (streak) => {
    await DB.setStreak(streak)
    set({ streak })
  },
  streakVisible: false,
  setStreakVisible: (streakVisible) => set({ streakVisible }),
  streakAllowed: false,
  setStreakAllowed: async (streakAllowed) => {
    await DB.setStreakAllowed(streakAllowed)
    set({ streakAllowed })
  }
}))
