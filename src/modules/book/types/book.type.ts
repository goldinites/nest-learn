export type BookResponse = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  publishedYear: number;
  genre: string;
  language: string;
  stockCount: number;
  rating: number;
  price: number;
};

export type GetBooksResponse = {
  content: BookResponse[];
  total: number;
};
