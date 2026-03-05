import { Injectable } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable()
export class BookService {
  books: Book[];
  constructor() {
    this.books = [];
  }

  getAll() {
    return this.books;
  }

  find(id: number) {
    return this.books.find((book) => book.id === id);
  }

  create(payload: Book) {
    this.books.push(payload);

    return payload;
  }

  update(payload: Book) {
    const index = this.books.findIndex((book) => book.id === payload.id);
    this.books[index] = payload;

    return this.books[index];
  }

  delete(id: number) {
    this.books = this.books.filter((book) => book.id !== id);

    return this.books;
  }
}
