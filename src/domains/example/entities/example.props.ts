import { EmailAddress } from '~/common/valueObjects';
import { Name, Detail } from '~/domains/example/valueObjects';

export type ExampleProps = {
  email: EmailAddress;
  name: Name;
  detail: Detail;
};
