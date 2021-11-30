import { ExampleSearchConditions } from '~/domains/example/entities';

export class ExampleSearchQuery {
  private readonly _cond: ExampleSearchConditions;

  constructor(cond: ExampleSearchConditions) {
    this._cond = Object.freeze(cond);
  }

  get cond() {
    return this._cond;
  }
}
