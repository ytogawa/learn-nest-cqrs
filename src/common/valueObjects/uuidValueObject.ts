import { ValueObject } from '~/common/valueObjects/valueObject';
import { genUUID } from '~/utils';
import { DomainError } from '../errors/domain.error';

const regexp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class UUIDValueObject extends ValueObject<string> {
  private static uuid(value?: string): string {
    if (value) {
      return value;
    }
    return genUUID();
  }

  constructor(value?: string) {
    const uuid = UUIDValueObject.uuid(value);
    if (!uuid.match(regexp)) {
      throw new DomainError(`no uuid. value=${uuid}`);
    }
    super(uuid);
  }
}
