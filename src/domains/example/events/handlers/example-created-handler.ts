import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ExampleCreated } from '../example-created';
import { ExampleWriteRepository } from '../..';

@EventsHandler(ExampleCreated)
export class ExampleCreatedHandler implements IEventHandler<ExampleCreated> {
  constructor(
    @Inject('ExampleWriteRepository')
    private repository: ExampleWriteRepository,
  ) {}

  async handle(event: ExampleCreated) {
    await this.repository.create(event);
  }
}
