import { Entity } from '~/common/entities';
import { ExampleProps } from '~/domains/example/entities/example-props';
import { ExampleId } from '~/domains/example/value-objects';

export class Example extends Entity<ExampleId, ExampleProps> {
  static fromCommand(id: ExampleId, props: ExampleProps): Example {
    return new Example(id, props);
  }
  static fromRepository(id: ExampleId, props: ExampleProps): Example {
    return new Example(id, props);
  }
}
