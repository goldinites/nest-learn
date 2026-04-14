import { Book } from '@/modules/book/entities/book.entity';
import { BookResponse } from '@/modules/book/types/book.type';
import { mapCategoryToResponse } from '@/modules/category/mappers/category-to-response.mapper';

export function mapBookToResponse(book: Book): BookResponse {
  const category = book.category
    ? mapCategoryToResponse(book.category)
    : undefined;

  return {
    id: book.id,
    title: book.title,
    imageUrl: book.imageUrl,
    author: book.author,
    publishedYear: book.publishedYear,
    language: book.language,
    stockCount: book.stockCount,
    rating: Number(book.rating),
    price: Number(book.price),
    category,
  };
}

export function mapBooksToResponse(books: Book[]): BookResponse[] {
  return books.map(mapBookToResponse);
}
