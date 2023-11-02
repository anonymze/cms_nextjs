import { create } from 'zustand'

export type FileTypeStore = {
    file: File,
    base64: string
}

type StateFiles = {
    files: FileTypeStore[]
}
  
type ActionFiles = {
    setFiles: (files: FileTypeStore[]) => void,
    // removeSingleFile: (file: File) => void
}

export const useFilesStore = create<StateFiles & ActionFiles>()((set) => ({
  files: [],
  setFiles: (files) => set((filesStore) => {
    if (files.length === 0) return { files: [] };
    return ({ files: [...filesStore.files, ...files] })
  }),
  // removeSingleFile: (file) => set((filesStore) => ({ files: filesStore.files })),
}))
