import { Injectable } from '@nestjs/common';
import { EtcdService } from '~/externals/etcd.service';
import { DomainEvent } from '../entities';
import { ValueObject } from '../value-objects';
import { EventRepository } from './event.repository';

@Injectable()
export class EventEtcdRepository implements EventRepository {
  constructor(private readonly etcd: EtcdService) {}

  async store(
    entityType: string,
    events: DomainEvent<ValueObject<unknown, string>, unknown>[],
  ): Promise<void> {
    for (const event of events) {
      await this.etcd
        .put(`${entityType}:${event.aggregateId.value}:${event.id.value}`)
        .value(JSON.stringify(event))
        .exec();
    }
  }

  async load<AggregateId extends ValueObject<unknown, string>, PayloadType>(
    entityType: string,
    aggregateId: AggregateId,
  ): Promise<DomainEvent<AggregateId, PayloadType>[]> {
    const range = await this.etcd
      .getAll()
      .prefix(`${entityType}:${aggregateId.value}`)
      .exec();

    return range.kvs
      .map((kv) => {
        const obj = JSON.parse(kv.value.toString());
        return {
          eventType: obj.eventType,
          aggregateId: obj.aggregateId,
          payload: obj.payload,
          id: obj.id,
          occurredAt: new Date(obj.occurredAt),
        } as DomainEvent<AggregateId, PayloadType>;
      })
      .sort((a, b) => {
        return a.occurredAt.getTime() - b.occurredAt.getTime();
      });
  }
}
