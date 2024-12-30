// Document Interface
export interface Document {
	id: number;
	fileName: string;
	filePath: string;
	fileType: FileType;
	size: number;
	document_id: string;
	createdAt: string;
	updatedAt: string;
	uploader: {
		name: string;
		avatar: string | null;
	};
	links: number;
	viewers: number;
	views: number;
	createdLinks?: { id: number; createdLink: string; lastViewed: Date; linkViews: number }[];
	visitors?: {
		id: number;
		visitor: string;
		downloads: number;
		lastViewed: Date;
		duration: string;
		completion: string;
	}[];
}

// User Interface
export interface User {
	id: number;
	name: string;
	email: string;
	role: 'Administrator' | 'Member';
	createdAt: string;
}

// Contact Interface
export interface Contact {
	userId: string;
	name: string;
	email: string;
	lastViewedLink: string;
	lastActivity: string;
	visits: number;
}

export const FileTypeConfig = {
	'application/pdf': '/assets/icons/documentPage/pdf-icon.svg',
	'application/msword': '/assets/icons/documentPage/word-icon.svg',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
		'/assets/icons/documentPage/word-icon.svg',
	'application/vnd.ms-excel': '/assets/icons/documentPage/xlsx-icon.svg',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
		'/assets/icons/documentPage/xlsx-icon.svg',
	'application/vnd.ms-powerpoint': '/assets/icons/documentPage/ppt-icon.svg',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation':
		'/assets/icons/documentPage/ppt-icon.svg',
	'application/zip': '/assets/icons/documentPage/zip-icon.svg',
	'text/plain': '/assets/icons/documentPage/txt-icon.svg',
	'image/png': '/assets/icons/documentPage/image-icon.svg',
	'image/jpeg': '/assets/icons/documentPage/image-icon.svg',
	'image/gif': '/assets/icons/documentPage/image-icon.svg',
	'audio/mpeg': '/assets/icons/documentPage/audio-icon.svg',
	'audio/wav': '/assets/icons/documentPage/audio-icon.svg',
	'video/mp4': '/assets/icons/documentPage/video-icon.svg',
	'video/x-msvideo': '/assets/icons/documentPage/video-icon.svg',
	General: '/assets/icons/documentPage/general-icon.svg',
} as const;

// Derive FileType from the keys of FileTypeConfig
export type FileType = keyof typeof FileTypeConfig;
