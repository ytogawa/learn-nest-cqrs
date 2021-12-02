import { Entity } from '~/common/entities';
import { ValueObject } from '~/common/value-objects';

export class EntityArray<
  T extends Entity<ValueObject<unknown, string>, unknown>,
> extends Array<T> {}
