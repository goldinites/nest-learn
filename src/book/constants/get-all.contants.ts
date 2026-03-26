import { BookGetAllReqDto } from '../dto/get-all.dto';

export const getAllBooksDefaultsReq: Required<BookGetAllReqDto> = {
  field: 'id',
  direction: 'ASC',
  limit: 25,
  offset: 0,
};
