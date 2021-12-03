import { ValueObject, GetValueType } from '~/common/value-objects';
import { clone } from '~/utils';

interface EntityConstructor<IdType, StateType, T> {
  new (id: IdType, state: StateType): T;
}

export abstract class Entity<
  IdType extends ValueObject<unknown, string>,
  StateType,
> {
  private readonly _state: StateType;

  protected constructor(private readonly _id: IdType, state: StateType) {
    this._state = { ...state };
  }

  get id(): GetValueType<IdType> {
    return this._id.value as GetValueType<IdType>;
  }

  protected get state() {
    return this._state;
  }

  equals(obj: Entity<IdType, StateType>) {
    return this._id.equals(obj._id);
  }
}
