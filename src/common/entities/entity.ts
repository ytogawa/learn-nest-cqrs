import { ValueObject } from '~/common/value-objects';

export abstract class Entity<IdType extends ValueObject<unknown, string>> {
  protected constructor(private readonly _id: IdType) {}

  get id(): IdType {
    return this._id;
  }

  equals(obj: Entity<IdType>) {
    return this._id.equals(obj._id);
  }
}
