import { ValueObject } from '~/common/value-objects/value-object';
import { generateUuid } from '~/utils';
import { DomainException } from '~/common/errors';

const regexp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class UuidValueObject<V extends string> extends ValueObject<string, V> {
  private static uuid(value?: string): string {
    if (value) {
      return value;
    }
    return generateUuid();
  }

  constructor(value?: string) {
    const uuid = UuidValueObject.uuid(value);
    if (!uuid.match(regexp)) {
      throw new DomainException(`no uuid. value=${uuid}`);
    }
    super(uuid);
  }
}
