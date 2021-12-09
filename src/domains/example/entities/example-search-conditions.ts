import { ExampleState } from '.';

type Stringer<T> = {
  [P in keyof T]: string;
};

type ExampleSearchConditionState = Readonly<
  Partial<Stringer<Omit<ExampleState, 'detail'>>>
>;

export class ExampleSearchConditions implements ExampleSearchConditionState {
  private constructor(readonly email?: string, readonly name?: string) {}

  static fromQuery(email?: string, name?: string): ExampleSearchConditions {
    return new ExampleSearchConditions(email, name);
  }
}
