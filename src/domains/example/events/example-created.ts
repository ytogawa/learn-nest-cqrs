import { DomainEvent } from '~/common/entities';
import { Example } from '..';

export class ExampleCreated implements DomainEvent<Example> {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly detail: string,
  ) {}

  apply(_obj: Example): void {
    return;
  }
}
