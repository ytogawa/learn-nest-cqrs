import { ExampleState } from '~/domains/example/entities';

export class ExampleCreateCommand {
  private readonly _state: ExampleState;

  constructor(state: ExampleState) {
    this._state = Object.freeze(state);
  }

  get state() {
    return this._state;
  }
}
