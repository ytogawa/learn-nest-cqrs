import { InternalServerErrorException } from '@nestjs/common';
import { ValueObject } from '~/utils/valueObject';

export class Detail extends ValueObject<string> {
  static readonly MAX_LENGTH = 500;

  constructor(value: string) {
    if (value.length > Detail.MAX_LENGTH) {
      throw new InternalServerErrorException();
    }
    super(value);
  }
}
