import { EmailAddress } from '~/common/valueObjects';
import { Name, Detail } from '~/example/valueObjects';

export type ExampleProps = {
  email: EmailAddress;
  name: Name;
  detail: Detail;
};
