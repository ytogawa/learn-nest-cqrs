import { AggregateRoot, DomainEvent } from '~/common/entities';
import { ExampleState } from '~/domains/example/entities/example-state';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import { ExampleCreated, ExampleUpdated } from '~/domains/example/events';
import { clone } from '~/utils';
import { DomainException } from '~/common/errors';
import { EmailAddress } from '~/common/value-objects';

export class Example extends AggregateRoot<ExampleId, ExampleState> {
  private constructor(id: ExampleId, state?: ExampleState | undefined) {
    super(id, state ?? new ExampleState());
  }

  static create(id: ExampleId, state: ExampleState): Example {
    const example = new Example(id);
    return example.withCreate(state);
  }

  static fromRepository(id: ExampleId, state: ExampleState): Example {
    return new Example(id, state);
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

  private withCreate(state: ExampleState): Example {
    const example = clone(this);
    example.applyChange(
      new ExampleCreated(
        example.id,
        state.email.value,
        state.name.value,
        state.detail.value,
      ),
    );
    return example;
  }

  withUpdate(state: Partial<ExampleState>): Example {
    const example = clone(this);
    example.applyChange(
      new ExampleUpdated(
        this.id,
        state.email?.value,
        state.name?.value,
        state.detail?.value,
      ),
    );
    return example;
  }

  protected apply(event: DomainEvent<ExampleId>) {
    if (event instanceof ExampleCreated) {
      return this.handleCreated(event);
    } else if (event instanceof ExampleUpdated) {
      return this.handleUpdated(event);
    }
    throw new DomainException(`Unknown event.`);
  }

  private handleCreated(event: ExampleCreated) {
    this.state.email = new EmailAddress(event.email);
    this.state.name = new Name(event.name);
    this.state.detail = new Detail(event.detail);
  }

  private handleUpdated(event: ExampleUpdated) {
    if (event.email) {
      this.state.email = new EmailAddress(event.email);
    }
    if (event.name) {
      this.state.name = new Name(event.name);
    }
    if (event.detail) {
      this.state.detail = new Detail(event.detail);
    }
  }
}
