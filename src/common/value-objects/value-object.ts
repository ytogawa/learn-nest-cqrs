import { deepEqual } from '~/utils';

export type GetValueType<T> = T extends ValueObject<infer U, any> ? U : unknown;

export class ValueObject<T, V extends string> {
  readonly '@type': V; // 異なるサブクラスが代入できないようにするため
  protected readonly _value: T;

  constructor(value: T) {
    this._value = Object.freeze(value);
  }

  get value(): T {
    return this._value;
  }

  equals(lhs: ValueObject<T, V>) {
    return deepEqual(this.value, lhs.value);
  }
}
