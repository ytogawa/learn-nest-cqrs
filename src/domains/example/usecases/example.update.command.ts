import { ExampleState } from '~/domains/example/entities';
import { ExampleId } from '~/domains/example/value-objects';

export class ExampleUpdateCommand {
  private readonly _state: Partial<ExampleState>;

  constructor(private readonly _id: ExampleId, state: Partial<ExampleState>) {
    this._state = Object.freeze(state);
  }

  get id() {
    return this._id;
  }

  get state() {
    return this._state;
  }
}
