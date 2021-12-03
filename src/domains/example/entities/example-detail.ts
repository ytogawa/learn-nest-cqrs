import { Entity } from '~/common/entities';
import { ExampleState } from '~/domains/example/entities/example-state';
import { ExampleId } from '~/domains/example/value-objects';

export class ExampleDetail extends Entity<ExampleId, ExampleState> {
  static fromRepository(id: ExampleId, state: ExampleState): ExampleDetail {
    return new ExampleDetail(id, state);
  }

  get email(): string {
    return this.state.email.value;
  }

  get name(): string {
    return this.state.name.value;
  }

  get detail(): string {
    return this.state.detail.value;
  }
}
