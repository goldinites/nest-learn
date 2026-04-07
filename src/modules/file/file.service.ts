import { Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { buildUploadPath, createUploadOptions } from './helpers/file.helper';
import { UPLOADS_FOLDER, UPLOADS_PATH } from './constants/file.constants';
import { FileFolder, UploadType } from '@/modules/file/types/file.types';

@Injectable()
export class FileService {
  createUploadOptions(folder: FileFolder, type: UploadType = 'file') {
    return createUploadOptions(folder, type);
  }

  ensureFolder(folder: FileFolder): string {
    return buildUploadPath(folder);
  }

  buildPublicUrl(folder: FileFolder, filename: string): string {
    return `/${UPLOADS_FOLDER}/${folder}/${filename}`;
  }

  removeFile(folder: FileFolder, filename: string): void {
    const filePath = join(UPLOADS_PATH, folder, filename);

    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }
}
