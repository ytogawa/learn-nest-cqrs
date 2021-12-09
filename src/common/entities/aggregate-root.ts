import { EventBus } from '@nestjs/cqrs';
import { Entity } from './entity';
import { DomainEvent } from './domain-event';
import { DomainException } from '~/common/errors';
import { ValueObject } from '~/common/value-objects';

export abstract class AggregateRoot<
  IdType extends ValueObject<unknown, string>,
  EventBase extends DomainEvent<IdType, unknown> = DomainEvent<IdType, unknown>,
> extends Entity<IdType> {
  readonly changes: EventBase[] = [];

  applyChange(event: EventBase): void {
    this.applyImpl(event);
    this.changes.push(event);
  }

  loadsFromHistory(histories: EventBase[]): void {
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
    if (!this.id.equals(event.aggregateId)) {
      throw new DomainException('Applying event to different entities.');
    }
    return;
  }

  reset(): void {
    this.changes.length = 0;
  }

  commit(bus: EventBus): void {
    bus.publishAll(this.changes);
    this.reset();
  }
}
