import { EventBus } from '@nestjs/cqrs';
import { Entity } from './entity';
import { ValueObject } from '../value-objects';

export interface DomainEvent<T extends Entity<any, any> = Entity<any, any>> {
  apply(obj: T): void;
}

export class AggregateRoot<
  IdType extends ValueObject<string | number>,
  ValueType,
  EventBase extends DomainEvent = DomainEvent,
> extends Entity<IdType, ValueType> {
  private readonly _events: EventBase[] = [];

  apply(event: EventBase) {
    this._events.push(event);
    event.apply(this);
  }

  reset() {
    this._events.length = 0;
  }

  commit(bus: EventBus): void {
    bus.publishAll(this._events);
    this.reset();
  }
}
