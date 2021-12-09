import { AggregateRoot, DomainEvent } from '~/common/entities';
import { ExampleState } from '~/domains/example/entities/example-state';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import { ExampleCreated, ExampleUpdated } from '~/domains/example/events';
import { clone } from '~/utils';
import { DomainException } from '~/common/errors';
import { EmailAddress } from '~/common/value-objects';

export class Example extends AggregateRoot<ExampleId> implements ExampleState {
  static create(id: ExampleId, state: ExampleState): Example {
    const example = new Example(id);
    return example.withCreate(state);
  }

  static fromRepository(id: ExampleId, state?: ExampleState): Example {
    return new Example(id, state);
  }

  private constructor(
    id: ExampleId,
    private readonly state: ExampleState = {
      email: new EmailAddress(),
      name: new Name(),
      detail: new Detail(),
    },
  ) {
    super(id);
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
      new ExampleCreated(example.id, {
        email: state.email,
        name: state.name,
        detail: state.detail,
      }),
    );
    return example;
  }

  withUpdate(state: Partial<ExampleState>): Example {
    const example = clone(this);
    example.applyChange(
      new ExampleUpdated(this.id, {
        email: state.email,
        name: state.name,
        detail: state.detail,
      }),
    );
    return example;
  }

  protected apply(event: DomainEvent<ExampleId, unknown>) {
    switch (event.eventType) {
      case ExampleCreated.name: {
        return this.handleCreated(event as ExampleCreated);
      }
      case ExampleUpdated.name: {
        return this.handleUpdated(event as ExampleUpdated);
      }
      default:
        throw new DomainException(`Unknown event.`);
    }
  }

  private handleCreated(event: ExampleCreated) {
    this.state.email = event.payload.email;
    this.state.name = event.payload.name;
    this.state.detail = event.payload.detail;
  }

  private handleUpdated(event: ExampleUpdated) {
    if (event.payload.email) {
      this.state.email = event.payload.email;
    }
    if (event.payload.name) {
      this.state.name = event.payload.name;
    }
    if (event.payload.detail) {
      this.state.detail = event.payload.detail;
    }
  }
}
