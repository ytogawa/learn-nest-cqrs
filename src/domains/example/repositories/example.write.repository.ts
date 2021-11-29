import { Example } from '~/domains/example/entities';

export interface ExampleWriteRepository {
  create(item: Example): Promise<Example>;
}
