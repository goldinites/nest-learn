import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { type Book, BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  getAll(): Book[] {
    return this.bookService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.bookService.find(id);
  }

  @Post('create')
  create(@Body() payload: Book) {
    return this.bookService.create(payload);
  }

  @Put('update')
  update(@Body() payload: Book) {
    return this.bookService.update(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}
