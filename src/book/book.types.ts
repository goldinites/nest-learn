import { Book } from './book.entity';

export type BookGetAllReqDto = {
  field?: keyof Book;
  direction?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
};
