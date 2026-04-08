import { UploadFileResponse } from '@/modules/file/types/file.types';
import { FILE_FOLDERS } from '@/modules/file/constants/file.constants';
import { FileService } from '@/modules/file/file.service';

const fileService = new FileService();

export function mapFileToResponse(
  file: Express.Multer.File,
): UploadFileResponse {
  return {
    filename: file.filename,
    originalName: file.originalname,
    url: fileService.buildPublicUrl(FILE_FOLDERS.images, file.filename),
    mimetype: file.mimetype,
    size: file.size,
    folder: FILE_FOLDERS.images,
  };
}
