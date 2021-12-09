import { Entity } from '~/common/entities';
import { EmailAddress } from '~/common/value-objects';
import { ExampleState } from '~/domains/example/entities/example-state';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';

export class ExampleDetail
  extends Entity<ExampleId>
  implements Readonly<ExampleState>
{
  constructor(
    id: ExampleId,
    readonly email: EmailAddress,
    readonly name: Name,
    readonly detail: Detail,
  ) {
    super(id);
  }
  static fromRepository(id: ExampleId, state: ExampleState): ExampleDetail {
    return new ExampleDetail(id, state.email, state.name, state.detail);
  }
}
