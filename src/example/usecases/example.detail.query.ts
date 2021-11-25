import { ExampleId } from '~/example/valueObjects/example.id';

export class ExampleDetailQuery {
  private readonly _id: ExampleId;

  constructor(id: ExampleId) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
