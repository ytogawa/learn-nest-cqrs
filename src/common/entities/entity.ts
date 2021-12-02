import { ValueObject, GetValueType } from '~/common/value-objects';

export abstract class Entity<
  IdType extends ValueObject<unknown, string>,
  ValueType,
> {
  private readonly _props: ValueType;

  protected constructor(private readonly _id: IdType, props: ValueType) {
    this._props = { ...props };
  }

  get id(): GetValueType<IdType> {
    return this._id.value as GetValueType<IdType>;
  }

  protected get props() {
    return this._props;
  }

  equals(obj: Entity<IdType, ValueType>) {
    return this._id.equals(obj._id);
  }
}
