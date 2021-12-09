import { ExampleSearchConditions } from '~/domains/example/entities';

export class ExampleSearchQuery {
  constructor(readonly cond: ExampleSearchConditions) {}
}
