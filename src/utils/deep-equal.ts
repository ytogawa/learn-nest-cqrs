import * as equal from 'fast-deep-equal';

export function deepEqual<T>(a: T, b: T): boolean {
  return equal(a, b);
}
