import { EmailAddress } from '~/common/value-objects';
import { Name, Detail } from '~/domains/example/value-objects';

export type ExampleProps = {
  email: EmailAddress;
  name: Name;
  detail: Detail;
};
