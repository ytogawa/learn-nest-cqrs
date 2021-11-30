import { ExampleId } from '~/domains/example/value-objects';

export class ExampleDetailQuery {
  private readonly _id: ExampleId;

  constructor(id: ExampleId) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
