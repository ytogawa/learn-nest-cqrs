import { ValueObject } from '~/common/value-objects';

export class Name extends ValueObject<string, 'Example.Name'> {
  constructor(value = '') {
    super(value);
  }
}
