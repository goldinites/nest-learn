import { CategoryResponse } from '@/modules/category/types/category.type';

export type BookResponse = {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  publishedYear: number;
  language: string;
  stockCount: number;
  rating: number;
  price: number;
  category?: CategoryResponse;
};
