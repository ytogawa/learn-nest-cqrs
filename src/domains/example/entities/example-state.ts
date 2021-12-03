import { EmailAddress } from '~/common/value-objects';
import { Name, Detail } from '~/domains/example/value-objects';

export class ExampleState {
  constructor(
    public email: EmailAddress = new EmailAddress(),
    public name: Name = new Name(),
    public detail: Detail = new Detail(),
  ) {}
}
