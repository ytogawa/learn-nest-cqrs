import { Entity } from '~/common/entities';
import { ExampleProps } from '~/domains/example/entities/example-props';
import { ExampleId } from '~/domains/example/value-objects';

export class ExampleDetail extends Entity<ExampleId, ExampleProps> {
  static fromRepository(id: ExampleId, props: ExampleProps): ExampleDetail {
    return new ExampleDetail(id, props);
  }

  get email(): string {
    return this.props.email.value;
  }

  get name(): string {
    return this.props.name.value;
  }

  get detail(): string {
    return this.props.detail.value;
  }
}
