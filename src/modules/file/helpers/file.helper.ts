import { existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import type { MulterModuleOptions } from '@nestjs/platform-express';
import {
  FILE_MIME_TYPES,
  IMAGE_MIME_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
  UPLOADS_PATH,
} from '@/modules/file/constants/file.constants';
import { FileFolder, UploadType } from '@/modules/file/types/file.types';

const ensureDirectory = (directoryPath: string): void => {
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
};

export const buildUploadPath = (folder: FileFolder): string => {
  const destination = join(UPLOADS_PATH, folder);
  ensureDirectory(destination);

  return destination;
};

export const createUploadOptions = (
  folder: FileFolder,
  type: UploadType = 'file',
): MulterModuleOptions => {
  const destination = buildUploadPath(folder);

  return {
    storage: diskStorage({
      destination,
      filename: (_req, file, callback) => {
        const fileExt = extname(file.originalname);
        callback(null, `${randomUUID()}${fileExt}`);
      },
    }),
    fileFilter: (_req, file, callback) => {
      if (type === 'image' && !IMAGE_MIME_TYPES.test(file.mimetype)) {
        callback(new Error('Only image files are allowed'), false);
        return;
      }

      if (type === 'file' && !FILE_MIME_TYPES.test(file.mimetype)) {
        callback(new Error('Not allowed format of file'), false);
        return;
      }

      callback(null, true);
    },
    limits: {
      fileSize: type === 'image' ? MAX_IMAGE_SIZE : MAX_FILE_SIZE,
    },
  };
};
