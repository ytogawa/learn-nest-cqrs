import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ExampleWriteRepository } from '../..';
import { ExampleUpdated } from '../example-updated';

@EventsHandler(ExampleUpdated)
export class ExampleUpdatedHandler implements IEventHandler<ExampleUpdated> {
  constructor(
    @Inject('ExampleWriteRepository')
    private repository: ExampleWriteRepository,
  ) {}

  async handle(event: ExampleUpdated) {
    await this.repository.update(event);
  }
}
