import { DomainEvent } from '~/common/entities';
import { EmailAddress } from '~/common/value-objects';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';

type ExampleCreatedPayload = {
  readonly email: EmailAddress;
  readonly name: Name;
  readonly detail: Detail;
};

export class ExampleCreated extends DomainEvent<
  ExampleId,
  ExampleCreatedPayload
> {
  constructor(aggregateId: ExampleId, payload: ExampleCreatedPayload) {
    super('ExampleCreated', aggregateId, payload);
  }
}
