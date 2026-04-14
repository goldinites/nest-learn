import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import CategoryController from '@/modules/category/category.controller';
import { CategoryService } from '@/modules/category/category.service';
import { FileModule } from '@/modules/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), FileModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
