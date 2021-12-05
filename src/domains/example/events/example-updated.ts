import { DomainEvent } from '~/common/entities';
import { EmailAddress } from '~/common/value-objects';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';

export class ExampleUpdatedPayload {
  constructor(
    private _email?: EmailAddress,
    private _name?: Name,
    private _detail?: Detail,
  ) {}

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get detail() {
    return this._detail;
  }
}

export class ExampleUpdated extends DomainEvent<
  ExampleId,
  ExampleUpdatedPayload
> {}
