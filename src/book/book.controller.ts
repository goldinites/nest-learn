import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import type { BookGetAllReqDto } from './book.types';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  getAll(@Query() params: BookGetAllReqDto) {
    return this.bookService.getAll(params);
  }

  @Get('get/:id')
  find(@Param('id') id: number) {
    return this.bookService.find(id);
  }

  @Post('create')
  create(@Body() payload: Book) {
    return this.bookService.create(payload);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() payload: Partial<Book>) {
    return this.bookService.update(id, payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}
