import { Entity } from './entity';
import { ValueObject } from './valueObject';

export class EntityArray<
  T extends Entity<ValueObject<string | number>, unknown>,
> implements Iterable<T>
{
  private _values: Array<T>;

  protected constructor(values: Array<T> = []) {
    this._values = values;
  }

  [Symbol.iterator](): Iterator<T, any, undefined> {
    return this._values[Symbol.iterator]();
  }

  append(value: T) {
    this._values.push(value);
  }
}
