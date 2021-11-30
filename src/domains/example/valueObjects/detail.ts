import { DomainError } from '~/common/errors/domain.error';
import { ValueObject } from '~/common/valueObjects';

export class Detail extends ValueObject<string> {
  static readonly MAX_LENGTH = 500;

  constructor(value: string) {
    if (value.length > Detail.MAX_LENGTH) {
      throw new DomainError(
        `The length of detail must be 500 characters or fewer. You entered ${value.length} characters.`,
      );
    }
    super(value);
  }
}
