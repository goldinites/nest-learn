import { Between, FindOperator } from 'typeorm';

export function normalizeBetween<T = number>(
  from?: T,
  to?: T,
): FindOperator<T> | undefined {
  if (from === undefined && to === undefined) return undefined;

  const rangeFrom = from ?? (0 as T);
  const rangeTo = to ?? (Number.MAX_SAFE_INTEGER as T);

  if ((rangeFrom as number) > (rangeTo as number)) {
    throw new Error('Invalid range: from cannot be greater than to');
  }

  return Between(rangeFrom, rangeTo);
}
