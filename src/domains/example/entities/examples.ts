import { EntityArray } from '~/common/entities';
import { ExamplesItem } from '~/domains/example/entities/examples-item';

export class Examples extends EntityArray<ExamplesItem> {
  static fromRepository() {
    return new Examples();
  }
}
