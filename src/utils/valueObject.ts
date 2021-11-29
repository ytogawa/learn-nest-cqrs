import { deepEqual } from '../utils/deepEqual';

export class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = Object.freeze(value);
  }

  toJson() {
    return this._value;
  }

  get value(): T {
    return this._value;
  }

  equals(lhs: ValueObject<T>) {
    return deepEqual(this.value, lhs.value);
  }
}
