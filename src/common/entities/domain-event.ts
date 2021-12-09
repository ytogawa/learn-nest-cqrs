import { UuidValueObject, ValueObject } from '../value-objects';

export abstract class DomainEvent<
  AggregateIdType extends ValueObject<unknown, string>,
  Payload,
> {
  constructor(
    public readonly eventType: string,
    public readonly aggregateId: AggregateIdType,
    public readonly payload: Payload,
    public readonly id: UuidValueObject<'DomainEvent'> = new UuidValueObject<'DomainEvent'>(),
    public readonly occurredAt: Date = new Date(),
  ) {}
}
