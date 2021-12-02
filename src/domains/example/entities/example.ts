import { AggregateRoot, DomainEvent } from '~/common/entities';
import { ExampleProps } from '~/domains/example/entities/example-props';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import { ExampleCreated, ExampleUpdated } from '~/domains/example/events';
import { clone } from '~/utils';
import { DomainException } from '~/common/errors';
import { EmailAddress } from '~/common/value-objects';

export class Example extends AggregateRoot<ExampleId, ExampleProps> {
  static fromRepository(id: ExampleId, props: ExampleProps): Example {
    return new Example(id, props);
  }

  get email(): string {
    return this.props.email?.value;
  }

  get name(): string {
    return this.props.name?.value;
  }

  get detail(): string {
    return this.props.detail?.value;
  }

  withCreate(props: ExampleProps): Example {
    const example = clone(this);
    example.apply(
      new ExampleCreated(
        example.id,
        props.email.value,
        props.name.value,
        props.detail.value,
      ),
    );
    return example;
  }

  withUpdate(props: Partial<ExampleProps>): Example {
    const example = clone(this);
    example.apply(
      new ExampleUpdated(
        this.id,
        props.email.value,
        props.name.value,
        props.detail.value,
      ),
    );
    return example;
  }

  protected handle(event: DomainEvent<ExampleId>) {
    if (event instanceof ExampleCreated) {
      return this.handleCreated(event);
    } else if (event instanceof ExampleUpdated) {
      return this.handleUpdated(event);
    }
    throw new DomainException(`Unknown event.`);
  }

  private handleCreated(event: ExampleCreated) {
    this.props.email = new EmailAddress(event.email);
    this.props.name = new Name(event.name);
    this.props.detail = new Detail(event.detail);
  }

  private handleUpdated(event: ExampleUpdated) {
    if (event.email) {
      this.props.email = new EmailAddress(event.email);
    }
    if (event.name) {
      this.props.name = new Name(event.name);
    }
    if (event.detail) {
      this.props.detail = new Detail(event.detail);
    }
  }
}
