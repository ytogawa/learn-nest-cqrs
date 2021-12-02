import { Entity } from '~/common/entities';
import { ExampleProps } from '~/domains/example/entities/example-props';
import { ExampleId, Name } from '~/domains/example/value-objects';
import { EmailAddress } from '~/common/value-objects';

type ExmaplesProps = Omit<ExampleProps, 'detail'>;

export class ExamplesItem extends Entity<ExampleId, ExmaplesProps> {
  static fromRepository(
    id: ExampleId,
    email: EmailAddress,
    name: Name,
  ): ExamplesItem {
    const value: ExmaplesProps = { name, email };
    return new ExamplesItem(id, value);
  }

  get email(): string {
    return this.props.email.value;
  }

  get name(): string {
    return this.props.name.value;
  }
}
