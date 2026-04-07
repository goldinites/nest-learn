import { BadRequestException } from '@nestjs/common';
import { Between, FindOptionsWhere } from 'typeorm';

export function normalizeQueryBetween<T, K>(
  query: T,
  rangeValueFields: string[],
): FindOptionsWhere<K> {
  const where = { ...query } as Record<string, unknown>;

  for (const field of rangeValueFields) {
    const fromKey = `${field}From`;
    const toKey = `${field}To`;

    const from = where[fromKey] as number | undefined;
    const to = where[toKey] as number | undefined;

    delete where[fromKey];
    delete where[toKey];

    if (from === undefined && to === undefined) continue;

    const normalizedFrom = from ?? 0;
    const normalizedTo = to ?? Number.MAX_SAFE_INTEGER;

    if (normalizedFrom > normalizedTo) {
      throw new BadRequestException(
        `${fromKey} cannot be greater than ${toKey}`,
      );
    }

    where[field] = Between(normalizedFrom, normalizedTo);
  }

  return where as FindOptionsWhere<K>;
}
