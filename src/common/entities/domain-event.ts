import { generateUuid } from '~/utils';
import { GetValueType } from '../value-objects';

export abstract class DomainEvent<AggregateIdType> {
  private readonly _id: string;
  private readonly _aggregateId: GetValueType<AggregateIdType>;
  protected constructor(
    aggregateId: GetValueType<AggregateIdType>,
    id?: string | undefined,
  ) {
    this._aggregateId = aggregateId;
    this._id = id ?? generateUuid();
  }

  get id(): string {
    return this._id;
  }

  get aggregateId(): GetValueType<AggregateIdType> {
    return this._aggregateId;
  }
}
