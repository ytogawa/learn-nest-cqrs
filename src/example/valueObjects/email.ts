import { ValueObject } from '~/utils/valueObject';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
