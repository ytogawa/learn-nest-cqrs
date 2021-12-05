import { Entity } from '~/common/entities';
import { ExampleState } from '~/domains/example/entities/example-state';
import { ExampleId, Name } from '~/domains/example/value-objects';
import { EmailAddress } from '~/common/value-objects';

type ExmaplesState = Omit<ExampleState, 'detail'>;

export class ExamplesItem extends Entity<ExampleId> {
  static fromRepository(
    id: ExampleId,
    email: EmailAddress,
    name: Name,
  ): ExamplesItem {
    const value: ExmaplesState = { name, email };
    return new ExamplesItem(id, value);
  }

  constructor(id: ExampleId, private state: ExmaplesState) {
    super(id);
  }

  get email(): EmailAddress {
    return this.state.email;
  }

  get name(): Name {
    return this.state.name;
  }
}
