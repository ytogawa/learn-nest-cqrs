import { ValueObject } from '~/common/valueObjects';

export class Entity<IdType extends ValueObject<string | number>, ValueType> {
  private _id: IdType;
  private _props: ValueType;

  protected constructor(id: IdType, props: ValueType) {
    this._id = id;
    this._props = { ...props };
  }

  toJSON() {
    return {
      id: this.id.toJson(),
      ...this._props,
    };
  }

  get id() {
    return this._id;
  }

  protected set id(value: IdType) {
    this._id = value;
  }

  get props() {
    return this._props;
  }

  equals(obj: Entity<IdType, ValueType>) {
    return this.id.equals(obj.id);
  }
}
