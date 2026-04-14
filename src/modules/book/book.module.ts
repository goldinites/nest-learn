import { BookService } from '@/modules/book/book.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/modules/book/entities/book.entity';
import { BookController } from '@/modules/book/book.controller';
import { FileModule } from '@/modules/file/file.module';
import { CategoryModule } from '@/modules/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), CategoryModule, FileModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
