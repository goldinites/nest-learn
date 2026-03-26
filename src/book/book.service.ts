import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '@book/entities/book.entity';
import { Repository } from 'typeorm';
import { GetListBookReqDto } from '@book/dto/get-list-book.dto';
import { getListBooksDefaultParams } from '@book/constants/get-list-book.constants';
import { BookErrors } from '@book/enums/errors.enum';
import { CreateBookDto } from '@book/dto/create-book.dto';
import { UpdateBookDto } from '@book/dto/update-book.dto';
import { DeleteBookResDto } from '@book/dto/delete-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getList(params?: GetListBookReqDto): Promise<Book[]> {
    const { field, direction, limit, offset } = {
      ...getListBooksDefaultParams,
      ...params,
    };

    return await this.bookRepository.find({
      order: { [field]: direction },
      take: limit,
      skip: offset,
    });
  }

  async find(id: number): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) throw new NotFoundException(BookErrors.NOT_FOUND);

    return book;
  }

  async create(payload: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(payload);

    if (!book) throw new BadRequestException(BookErrors.NOT_CREATED);

    return await this.bookRepository.save(book);
  }

  async update(id: number, payload: UpdateBookDto): Promise<Book | null> {
    await this.find(id);

    const updated = await this.bookRepository.update(id, payload);

    if (updated.affected === 0) {
      throw new BadRequestException(BookErrors.NOT_UPDATED);
    }

    return await this.find(id);
  }

  async delete(id: number): Promise<DeleteBookResDto> {
    await this.find(id);

    const { affected } = await this.bookRepository.delete(id);

    if (!affected) {
      throw new BadRequestException(BookErrors.NOT_DELETED);
    }

    return { success: true };
  }
}
