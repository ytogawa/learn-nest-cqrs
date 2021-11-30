import equal from 'fast-deep-equal';

export function deepEqual<T>(a: T, b: T) {
  return equal(a, b);
}
