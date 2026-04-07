import { FindOptionsWhere } from 'typeorm';
import { normalizeQueryIn } from '@/modules/utils/query/normalize-query-in';
import { normalizeQueryBetween } from '@/modules/utils/query/normalize-query-between';

type NormalizeQueryOptions = {
  inFields?: string[];
  betweenFields?: string[];
};

export function normalizeQuery<T, K>(
  query: T,
  options: NormalizeQueryOptions,
): FindOptionsWhere<K> {
  let where = { ...query } as Record<string, unknown>;

  if (options.inFields?.length) {
    where = normalizeQueryIn(where, options.inFields);
  }

  if (options.betweenFields?.length) {
    where = normalizeQueryBetween(where, options.betweenFields);
  }

  return where as FindOptionsWhere<K>;
}
