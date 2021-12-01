import { AggregateRoot } from '~/common/entities';
import { ExampleProps } from '~/domains/example/entities/example-props';
import { ExampleId } from '~/domains/example/value-objects';
import { ExampleCreated } from '~/domains/example/events';
import { clone } from '~/utils/clone';

export class Example extends AggregateRoot<ExampleId, ExampleProps> {
  static withCreate(id: ExampleId, props: ExampleProps): Example {
    const example = new Example(id, props);
    return example.withCreate();
  }

  static fromRepository(id: ExampleId, props: ExampleProps): Example {
    return new Example(id, props);
  }

  private withCreate(): Example {
    const example = clone(this);
    this.apply(
      new ExampleCreated(
        this.id.value,
        this.props.email.value,
        this.props.name.value,
        this.props.detail.value,
      ),
    );
    return example;
  }
}
