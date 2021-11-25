import { ExampleProps } from '~/example/entities/example.props';

export class ExampleCreateCommand {
  private readonly _props: ExampleProps;

  constructor(props: ExampleProps) {
    this._props = Object.freeze(props);
  }

  get props() {
    return this._props;
  }
}
