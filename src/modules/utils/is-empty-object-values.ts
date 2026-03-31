export function isEmptyObjectValues<T extends object>(obj: T): boolean {
  return Object.values(obj).every((val: unknown): boolean => !val);
}
