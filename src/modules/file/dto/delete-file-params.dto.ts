import { IsString, Matches } from 'class-validator';
import { FILE_FOLDERS } from '@/modules/file/constants/file.constants';

const allowedFolders = Object.values(FILE_FOLDERS).join('|');

export class DeleteFileParamsDto {
  @IsString()
  @Matches(new RegExp(`^(${allowedFolders})$`))
  folder: string;

  @IsString()
  filename: string;
}
