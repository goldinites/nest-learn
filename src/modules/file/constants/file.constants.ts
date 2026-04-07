import { join } from 'path';

export const UPLOADS_FOLDER = 'uploads';
export const UPLOADS_PATH = join(process.cwd(), UPLOADS_FOLDER);

export const IMAGE_MIME_TYPES = /^image\/(jpeg|jpg|png|webp|gif|avif)$/;
export const FILE_MIME_TYPES =
  /^application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
