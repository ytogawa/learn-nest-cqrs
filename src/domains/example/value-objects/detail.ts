import { DomainException } from '~/common/errors';
import { ValueObject } from '~/common/value-objects';

export class Detail extends ValueObject<string, 'Example.Detail'> {
  static readonly MAX_LENGTH = 500;

  constructor(value = '') {
    super(value);
    if (value.length > Detail.MAX_LENGTH) {
      throw new DomainException(
        `The length of detail must be 500 characters or fewer. You entered ${value.length} characters.`,
      );
    }
  }
}
