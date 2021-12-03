import { EventBus } from '@nestjs/cqrs';
import { Entity } from './entity';
import { DomainEvent } from './domain-event';
import { DomainException } from '~/common/errors';
import { ValueObject } from '../value-objects';

export abstract class AggregateRoot<
  IdType extends ValueObject<unknown, string>,
  StateType,
  EventBase extends DomainEvent<IdType> = DomainEvent<IdType>,
> extends Entity<IdType, StateType> {
  private readonly _changes: EventBase[] = [];

  applyChange(event: EventBase): void {
    this.applyImpl(event);
    this._changes.push(event);
  }

  loadsFromHistory(histories: EventBase[]) {
    for (const history of histories) {
      this.applyImpl(history);
    }
  }

  private applyImpl(event: EventBase) {
    this.checkCanApply(event);
    this.apply(event);
  }

  protected abstract apply(event: EventBase): void;

  private checkCanApply(event: EventBase): void {
    if (this.id !== event.aggregateId) {
      throw new DomainException('Applying event to different entities.');
    }
    return;
  }

  reset(): void {
    this._changes.length = 0;
  }

  commit(bus: EventBus): void {
    bus.publishAll(this._changes);
    this.reset();
  }
}
