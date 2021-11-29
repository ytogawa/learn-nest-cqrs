import { Entity } from '~/common/entities';
import { ExampleProps } from '~/example/entities/example.props';
import { ExampleId } from '~/example/valueObjects/example.id';

export class ExampleDetail extends Entity<ExampleId, ExampleProps> {
  static fromRepository(id: ExampleId, props: ExampleProps): ExampleDetail {
    return new ExampleDetail(id, props);
  }
}
