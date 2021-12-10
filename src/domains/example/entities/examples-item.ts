import { Entity } from '~/common/entities';
import { EmailAddress } from '~/common/value-objects';
import { ExampleState } from '~/domains/example/entities/example-state';
import { ExampleId, Name } from '~/domains/example/value-objects';

type ExamplesItemState = Readonly<Omit<ExampleState, 'detail'>>;

export class ExamplesItem
  extends Entity<ExampleId>
  implements ExamplesItemState
{
  static fromRepository(
    id: ExampleId,
    email: EmailAddress,
    name: Name,
  ): ExamplesItem {
    return new ExamplesItem(id, email, name);
  }

  constructor(
    id: ExampleId,
    readonly email: EmailAddress,
    readonly name: Name,
  ) {
    super(id);
  }
}
