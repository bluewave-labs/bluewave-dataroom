// src/store/useFileInfoStore.ts
import { create } from 'zustand';

interface FileInfo {
	name: string;
	size: string;
	type: string;
}

interface FileInfoStore {
	fileInfo: FileInfo;
	file: File | null; // Store the actual file object
	setFileInfo: (info: FileInfo) => void;
	setFile: (file: File) => void; // Function to set the file object
}

export const useFileInfoStore = create<FileInfoStore>((set) => ({
	fileInfo: { name: '', size: '', type: '' },
	file: null, // Initially, no file is selected
	setFileInfo: (info: FileInfo) => set({ fileInfo: info }),
	setFile: (file: File) => set({ file }), // Set the actual file
}));
