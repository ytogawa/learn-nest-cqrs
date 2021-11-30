import { ExampleProps } from '~/domains/example/entities';

export class ExampleCreateCommand {
  private readonly _props: ExampleProps;

  constructor(props: ExampleProps) {
    this._props = Object.freeze(props);
  }

  get props() {
    return this._props;
  }
}
