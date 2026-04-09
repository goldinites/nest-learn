import { FileMetadata } from '@/modules/file/types/file.types';

export function prepareFileMetadata(file: Express.Multer.File): FileMetadata {
  return {
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
  };
}
