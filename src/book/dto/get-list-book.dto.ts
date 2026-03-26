import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import type { FindOptionsOrderValue } from 'typeorm';

export const BOOK_SORT_FIELDS = [
  'id',
  'title',
  'author',
  'publishedYear',
  'genre',
  'language',
  'stockCount',
  'rating',
  'price',
] as const;

export type BookSortField = (typeof BOOK_SORT_FIELDS)[number];

export class GetListBookReqDto {
  @IsOptional()
  @IsIn(BOOK_SORT_FIELDS)
  field?: BookSortField;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  direction?: FindOptionsOrderValue;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}
