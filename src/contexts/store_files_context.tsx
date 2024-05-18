import { create } from "zustand";

export type FileTypeStore = {
	// force to set an id even if you don't have one in case of looping
	id: string;
	file: File;
	base64: string;
};

type StateFiles = {
	files: FileTypeStore[];
};

type ActionFiles = {
	setFiles: (files: FileTypeStore[]) => void;
	removeFile: (file: File) => void;
};

export const useFilesStore = create<StateFiles & ActionFiles>()((set) => ({
	files: [],
	setFiles: (files) =>
		set((filesStore) => ({ files: files.length === 0 ? [] : [...filesStore.files, ...files] })),
	removeFile: (file) =>
		set((filesStore) => ({
			files: filesStore.files.filter((fileStore) => fileStore.file !== file),
		})),
}));
