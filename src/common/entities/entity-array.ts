import { Entity } from '~/common/entities';
import { ValueObject } from '~/common/value-objects';

export class EntityArray<
  T extends Entity<ValueObject<unknown, string>>,
> extends Array<T> {}
