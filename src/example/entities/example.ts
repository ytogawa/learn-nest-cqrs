import { Entity } from '~/utils/entity';
import { ExampleProps } from '~/example/entities/example.props';
import { ExampleId } from '~/example/valueObjects/example.id';

export class Example extends Entity<ExampleId, ExampleProps> {
  static fromCommand(id: ExampleId, props: ExampleProps): Example {
    return new Example(id, props);
  }
  static fromRepository(id: ExampleId, props: ExampleProps): Example {
    return new Example(id, props);
  }
}
