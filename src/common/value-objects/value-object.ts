import { deepEqual } from '~/utils';

export class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = Object.freeze(value);
  }

  get value(): T {
    return this._value;
  }

  equals(lhs: ValueObject<T>) {
    return deepEqual(this.value, lhs.value);
  }
}
