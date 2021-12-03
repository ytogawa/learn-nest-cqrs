import { ValueObject } from '~/common/value-objects/value-object';

export class EmailAddress extends ValueObject<string, 'EmailAddress'> {
  constructor(value: string = '') {
    super(value);
  }
}
export class EmailTitle extends ValueObject<string, 'EmailTitle'> {}
export class EmailBody extends ValueObject<string, 'EmailBody'> {}
