import { Entity } from '~/common/entities';
import { EmailAddress } from '~/common/value-objects';
import { ExampleState } from '~/domains/example/entities/example-state';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';

export class ExampleDetail extends Entity<ExampleId> {
  constructor(id: ExampleId, private state: ExampleState) {
    super(id);
  }
  static fromRepository(id: ExampleId, state: ExampleState): ExampleDetail {
    return new ExampleDetail(id, state);
  }

  get email(): EmailAddress {
    return this.state.email;
  }

  get name(): Name {
    return this.state.name;
  }

  get detail(): Detail {
    return this.state.detail;
  }
}
