import {
  Examples,
  ExampleSearchConditions,
  ExampleDetail,
} from '~/domains/example/entities';
import { ExampleId } from '~/domains/example/value-objects';

export interface ExampleReadRepository {
  findByCondition(cond: ExampleSearchConditions): Promise<Examples>;
  findById(id: ExampleId): Promise<ExampleDetail>;
}
