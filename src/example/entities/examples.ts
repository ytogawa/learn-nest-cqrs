import { ExamplesItem } from '~/example/entities/examples.item';
import { EntityArray } from '~/utils/entityArray';

export class Examples extends EntityArray<ExamplesItem> {
  static fromRepository() {
    return new Examples();
  }
}
