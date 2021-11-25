import { Example } from '~/example/entities';

export interface ExampleWriteRepository {
  create(item: Example): Promise<Example>;
}
