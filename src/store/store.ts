import { create } from 'zustand';
import * as DB from '../utils/db';
import type { FileData } from '../shared/types'

interface FileStoreState {
  fileList: FileData[];
  setFileList: (fileList: FileData[]) => void;
  loadAllMetadata: () => Promise<void>;
}

interface SnackbarStoreState {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

interface SnackbarMessageStoreState {
  message: { action: string; text: string };
  setMessage: (message: { action: string; text: string }) => void;
}

interface SheetDestroyDialogStoreState {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
  fileList: [],
  setFileList: (fileList) => set({ fileList }),
  loadAllMetadata: async () => {
    set({ fileList: await DB.getFiles() });
  },
}));

export const useSnackbarStore = create<SnackbarStoreState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible }),
}));

export const useSnackbarMessageStore = create<SnackbarMessageStoreState>((set) => ({
  message: { action: '', text: '' },
  setMessage: (message) => set({ message }),
}));

export const useSheetDestroyDialogStore = create<SheetDestroyDialogStoreState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible }),
}));
