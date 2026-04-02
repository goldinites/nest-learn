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
  UseGuards,
} from '@nestjs/common';
import { BookService } from '@/modules/book/book.service';
import { GetBookReqDto } from '@/modules/book/dto/get-book.dto';
import { CreateBookDto } from '@/modules/book/dto/create-book.dto';
import { UpdateBookDto } from '@/modules/book/dto/update-book.dto';
import { Book } from '@/modules/book/entities/book.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { Permissions } from '@/modules/auth/decorators/permissions.decorator';
import { Roles } from '@/modules/user/enums/roles.enum';
import { BookResponse } from '@/modules/book/types/book.type';
import {
  mapBooksToResponse,
  mapBookToResponse,
} from '@/modules/book/mappers/book-to-response.mapper';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookResponse | null> {
    const book: Book | null = await this.bookService.findById(id);

    if (!book) return null;

    return mapBookToResponse(book);
  }

  @Get()
  async find(@Query() query: GetBookReqDto): Promise<BookResponse[]> {
    const books: Book[] = await this.bookService.find(query);

    if (books.length === 0) return [];

    return mapBooksToResponse(books);
  }

  @Post()
  @Permissions(Roles.ADMIN)
  async create(@Body() payload: CreateBookDto): Promise<BookResponse> {
    const book: Book = await this.bookService.create(payload);

    return mapBookToResponse(book);
  }

  @Post('import')
  @Permissions(Roles.ADMIN)
  async import(
    @Body(new ParseArrayPipe({ items: CreateBookDto }))
    payload: CreateBookDto[],
  ): Promise<BookResponse[]> {
    const books: Book[] = await this.bookService.import(payload);

    if (books.length === 0) return [];

    return mapBooksToResponse(books);
  }

  @Patch(':id')
  @Permissions(Roles.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ): Promise<BookResponse | null> {
    const book: Book | null = await this.bookService.update(id, payload);

    if (!book) return null;

    return mapBookToResponse(book);
  }

  @Delete(':id')
  @Permissions(Roles.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.bookService.delete(id);
  }
}
