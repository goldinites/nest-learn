import { Book } from '../entities/book.entity';
import { FindOptionsOrderValue } from 'typeorm/find-options/FindOptionsOrder';

export type BookGetAllReqDto = {
  field?: keyof Book;
  direction?: FindOptionsOrderValue;
  limit?: number;
  offset?: number;
};
