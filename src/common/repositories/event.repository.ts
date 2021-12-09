import { DomainEvent } from '../entities';
import { ValueObject } from '../value-objects';

export interface EventRepository {
  store(
    prefix: string,
    events: DomainEvent<ValueObject<unknown, string>, unknown>[],
  ): Promise<void>;
  load<AggregateId extends ValueObject<unknown, string>, PayloadType>(
    prefix: string,
    aggregateId: AggregateId,
  ): Promise<DomainEvent<AggregateId, PayloadType>[]>;
}
