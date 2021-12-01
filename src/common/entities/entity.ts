import { ValueObject } from '~/common/value-objects';

export class Entity<IdType extends ValueObject<string | number>, ValueType> {
  private readonly _props: ValueType;

  protected constructor(private readonly _id: IdType, props: ValueType) {
    this._props = { ...props };
  }

  get id() {
    return this._id;
  }

  get props() {
    return this._props;
  }

  equals(obj: Entity<IdType, ValueType>) {
    return this.id.equals(obj.id);
  }
}
