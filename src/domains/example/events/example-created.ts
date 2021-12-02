import { DomainEvent } from '~/common/entities';
import { ExampleId } from '..';

export class ExampleCreated extends DomainEvent<ExampleId> {
  constructor(
    aggregateId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly detail: string,
  ) {
    super(aggregateId);
  }
}