import { ValueObject } from '~/common/value-objects/value-object';

export class EmailAddress extends ValueObject<string, 'EmailAddress'> {}
export class EmailTitle extends ValueObject<string, 'EmailTitle'> {}
export class EmailBody extends ValueObject<string, 'EmailBody'> {}
