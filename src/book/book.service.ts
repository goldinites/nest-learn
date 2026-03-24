import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAll(): Promise<Book[]> {
    return await this.bookRepository.find({ order: { id: 'ASC' } });
  }

  async find(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  async create(payload: Book): Promise<Book[]> {
    await this.bookRepository.save(payload);

    return await this.getAll();
  }

  async update(id: number, payload: Partial<Book>): Promise<Book | null> {
    if (!id) return null;

    await this.bookRepository.update(id, payload);

    return await this.find(id);
  }

  async delete(id: number): Promise<boolean> {
    if (!id) return false;

    const { affected } = await this.bookRepository.delete(id);

    if (!affected) return false;

    return affected > 0;
  }
}
