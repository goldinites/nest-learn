import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from '@/modules/book/book.service';
import { GetListBookReqDto } from '@/modules/book/dto/get-list-book.dto';
import { CreateBookDto } from '@/modules/book/dto/create-book.dto';
import { UpdateBookDto } from '@/modules/book/dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getList(@Query() params: GetListBookReqDto) {
    return this.bookService.getList(params);
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.find(id);
  }

  @Post()
  create(@Body() payload: CreateBookDto) {
    return this.bookService.create(payload);
  }

  @Post('import')
  async import(
    @Body(new ParseArrayPipe({ items: CreateBookDto }))
    payload: CreateBookDto[],
  ) {
    if (payload.length === 0) return;

    for (const book of payload) {
      await this.bookService.create(book);
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ) {
    return this.bookService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id);
  }
}
