import { ValueObject } from '~/utils/valueObject';

export class Name extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}