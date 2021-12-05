import { generateUuid } from '~/utils';
import { ValueObject } from '../value-objects';

export abstract class DomainEvent<AggregateIdType, Payload> {
  private readonly _id: ValueObject<string, 'DomainEvent'>;
  private readonly _aggregateId: AggregateIdType;
  private readonly _payload: Payload;

  constructor(
    aggregateId: AggregateIdType,
    payload: Payload,
    id?: string | undefined,
  ) {
    this._aggregateId = aggregateId;
    this._payload = payload;
    this._id = new ValueObject(id ?? generateUuid());
  }

  get id(): ValueObject<string, 'DomainEvent'> {
    return this._id;
  }

  get aggregateId(): AggregateIdType {
    return this._aggregateId;
  }

  get payload(): Payload {
    return this._payload;
  }
}
