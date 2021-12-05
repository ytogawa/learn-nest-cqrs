import { EmailAddress } from '~/common/value-objects';
import { Name, Detail } from '~/domains/example/value-objects';

export type ExampleState = {
  email: EmailAddress;
  name: Name;
  detail: Detail;
};
