import { create } from 'zustand';
import * as DB from './utils/db'

export const useFileStore = create((set) => ({
  fileList: [],
  setFileList: (fileList) => set({ fileList }),
  loadAllMetadata: async () => {
    const allData = await DB.getFiles();
    const files = allData.map((f) => ({ id: f.id, name: f.filename }));
    set({ fileList: files });
  }
}))

export const useSnackbarStore = create((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible })
}))

export const useSnackbarMessageStore = create((set) => ({
  snackbarMessage: { action: '', text: '' },
  setSnackbarMessage: (snackbarMessage) => set({ snackbarMessage })
}))

export const useSheetDestroyDialogStore = create((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible })
}))
