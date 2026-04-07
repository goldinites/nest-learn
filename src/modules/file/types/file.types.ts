export const FILE_FOLDERS = {
  images: 'images',
  files: 'files',
} as const;

export type FileFolder = (typeof FILE_FOLDERS)[keyof typeof FILE_FOLDERS];

export type UploadType = 'image' | 'file';
