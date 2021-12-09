import { DomainEvent } from '~/common/entities';
import { EmailAddress } from '~/common/value-objects';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';

interface ExampleUpdatedPayload {
  readonly email?: EmailAddress;
  readonly name?: Name;
  readonly detail?: Detail;
}

export class ExampleUpdated extends DomainEvent<
  ExampleId,
  ExampleUpdatedPayload
> {
  constructor(aggregateId: ExampleId, payload: ExampleUpdatedPayload) {
    super('ExampleUpdated', aggregateId, payload);
  }
}
