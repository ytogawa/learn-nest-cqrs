export class ExampleSearchConditions {
  private constructor(
    private readonly _email?: string,
    private readonly _name?: string,
  ) {}

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  static fromQuery(email?: string, name?: string): ExampleSearchConditions {
    return new ExampleSearchConditions(email, name);
  }
}
