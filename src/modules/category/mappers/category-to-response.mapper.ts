import { Category } from '@/modules/category/entities/category.entity';
import { CategoryResponse } from '@/modules/category/types/category.type';
import { mapBooksToResponse } from '@/modules/book/mappers/book-to-response.mapper';

export function mapCategoryToResponse(
  category: Category,
  withBooks?: boolean,
): CategoryResponse {
  const books = withBooks
    ? mapBooksToResponse(category?.books ?? [])
    : undefined;

  return {
    id: category.id,
    title: category.title,
    description: category.description,
    imageUrl: category.imageUrl,
    booksCount: category.booksCount,
    books,
  };
}

export function mapCategoriesToResponse(
  categories: Category[],
  withBooks?: boolean,
): CategoryResponse[] {
  return categories.map((category) =>
    mapCategoryToResponse(category, withBooks),
  );
}
