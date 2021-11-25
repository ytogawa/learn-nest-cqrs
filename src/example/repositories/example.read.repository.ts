import {
  Examples,
  ExampleSearchConditions,
  ExampleDetail,
} from '~/example/entities';
import { ExampleId } from '../valueObjects';

export interface ExampleReadRepository {
  findByCondition(cond: ExampleSearchConditions): Promise<Examples>;
  findById(id: ExampleId): Promise<ExampleDetail>;
}
