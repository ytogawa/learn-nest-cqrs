import { ValueObject } from '~/common/value-objects';

export abstract class Entity<IdType extends ValueObject<unknown, string>> {
  protected constructor(readonly id: IdType) {}

  equals(obj: Entity<IdType>) {
    return this.id.equals(obj.id);
  }
}
