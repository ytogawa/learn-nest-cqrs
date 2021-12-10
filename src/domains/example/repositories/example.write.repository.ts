import { Example } from '~/domains/example/entities';
import { ExampleCreated, ExampleUpdated } from '~/domains/example/events';
import { ExampleId } from '~/domains/example/value-objects';

export interface ExampleWriteRepository {
  save(item: Example): Promise<void>;
  create(item: ExampleCreated): Promise<void>;
  update(item: ExampleUpdated): Promise<void>;
  getById(id: ExampleId): Promise<Example>;
}
