import { Entity } from '~/utils/entity';
import { ExampleProps } from '~/example/entities/example.props';
import { ExampleId, Name } from '~/example/valueObjects';
import { EmailAddress } from '~/common/valueObjects';

type ExmaplesProps = Omit<ExampleProps, 'detail'>;

export class ExamplesItem extends Entity<ExampleId, ExmaplesProps> {
  private constructor(id: ExampleId, value: ExmaplesProps) {
    super(id, value);
  }

  static fromRepository(
    id: ExampleId,
    email: EmailAddress,
    name: Name,
  ): ExamplesItem {
    const value: ExmaplesProps = { name, email };
    return new ExamplesItem(id, value);
  }
}
