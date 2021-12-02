import { Example } from '~/domains/example/entities';
import { ExampleId } from '~/domains/example/value-objects';

export interface ExampleWriteRepository {
  create(item: Example): Promise<Example>;
  update(item: Example): Promise<Example>; // 最終的にCUDはイベントの保存一本になる？
  getById(id: ExampleId): Promise<Example>;
}
