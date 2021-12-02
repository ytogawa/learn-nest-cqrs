import { ExampleProps } from '~/domains/example/entities';
import { ExampleId } from '~/domains/example/value-objects';

export class ExampleUpdateCommand {
  private readonly _props: Partial<ExampleProps>;

  constructor(private readonly _id: ExampleId, props: Partial<ExampleProps>) {
    this._props = Object.freeze(props);
  }

  get id() {
    return this._id;
  }

  get props() {
    return this._props;
  }
}
