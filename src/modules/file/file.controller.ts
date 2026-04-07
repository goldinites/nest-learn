import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { DeleteFileParamsDto } from './dto/delete-file-params.dto';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { createUploadOptions } from './helpers/file.helper';
import { FILE_FOLDERS } from '@/modules/file/types/file.types';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', createUploadOptions(FILE_FOLDERS.images, 'image')),
  )
  uploadImage(
    @UploadedFile(new ParseFilePipeBuilder().build({ fileIsRequired: true }))
    file: Express.Multer.File,
  ): UploadFileResponseDto {
    if (!file) throw new BadRequestException('File is required');

    return {
      filename: file.filename,
      originalName: file.originalname,
      url: this.fileService.buildPublicUrl(FILE_FOLDERS.images, file.filename),
      mimetype: file.mimetype,
      size: file.size,
      folder: FILE_FOLDERS.images,
    };
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', createUploadOptions(FILE_FOLDERS.files, 'file')),
  )
  uploadFile(
    @UploadedFile(new ParseFilePipeBuilder().build({ fileIsRequired: true }))
    file: Express.Multer.File,
  ): UploadFileResponseDto {
    if (!file) throw new BadRequestException('File is required');

    return {
      filename: file.filename,
      originalName: file.originalname,
      url: this.fileService.buildPublicUrl(FILE_FOLDERS.files, file.filename),
      mimetype: file.mimetype,
      size: file.size,
      folder: FILE_FOLDERS.files,
    };
  }

  @Delete(':folder/:filename')
  deleteFile(@Param() params: DeleteFileParamsDto): { success: true } {
    this.fileService.removeFile(
      params.folder as keyof typeof FILE_FOLDERS,
      params.filename,
    );
    return { success: true };
  }
}
