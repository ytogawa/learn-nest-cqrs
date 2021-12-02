import { EventBus } from '@nestjs/cqrs';
import { Entity } from './entity';
import { DomainEvent } from './domain-event';
import { DomainException } from '~/common/errors';
import { ValueObject } from '../value-objects';

export abstract class AggregateRoot<
  IdType extends ValueObject<unknown, string>,
  ValueType,
  EventBase extends DomainEvent<IdType> = DomainEvent<IdType>,
> extends Entity<IdType, Partial<ValueType>> {
  private readonly _events: EventBase[] = [];

  constructor(id: IdType, props?: Partial<ValueType> | undefined) {
    super(id, props ?? {});
  }

  apply(event: EventBase): void {
    this.checkCanApply(event);
    this.handle(event);
    this._events.push(event);
  }

  protected abstract handle(event: EventBase): void;

  private checkCanApply(event: EventBase): void {
    if (this.id !== event.aggregateId) {
      throw new DomainException('Applying event to different entities.');
    }
    return;
  }

  reset(): void {
    this._events.length = 0;
  }

  commit(bus: EventBus): void {
    bus.publishAll(this._events);
    this.reset();
  }
}
