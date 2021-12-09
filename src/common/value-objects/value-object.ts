import { deepEqual } from '~/utils';

export class ValueObject<T, V extends string> {
  readonly '@type': V; // 異なるサブクラスが代入できないようにするため

  constructor(readonly value: T) {}

  equals(lhs: ValueObject<T, V>): boolean {
    return deepEqual(this.value, lhs.value);
  }
}
