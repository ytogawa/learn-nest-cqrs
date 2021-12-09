import { Example } from '~/domains/example/entities';
import { ExampleId } from '~/domains/example/value-objects';
import { ExampleCreated, ExampleUpdated } from '..';

export interface ExampleWriteRepository {
  save(item: Example): Promise<void>;
  create(item: ExampleCreated): Promise<void>;
  update(item: ExampleUpdated): Promise<void>;
  getById(id: ExampleId): Promise<Example>;
}
