import { GetBookReqDto } from '@/modules/book/dto/get-list-book.dto';

export const getListBooksDefaultParams: Required<
  Pick<GetBookReqDto, 'field' | 'direction' | 'limit' | 'offset'>
> = {
  field: 'id',
  direction: 'ASC',
  limit: 25,
  offset: 0,
};
