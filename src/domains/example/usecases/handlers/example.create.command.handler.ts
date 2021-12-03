import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';
import { Example } from '~/domains/example/entities';
import { ExampleCreateCommand } from '~/domains/example/usecases/example.create.command';
import { ExampleId } from '~/domains/example/value-objects';

@CommandHandler(ExampleCreateCommand)
export class ExampleCreateCommandHandler
  implements ICommandHandler<ExampleCreateCommand>
{
  constructor(
    @Inject('ExampleWriteRepository')
    private readonly repository: ExampleWriteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ExampleCreateCommand): Promise<Example> {
    const created = Example.create(new ExampleId(), command.state);
    await this.repository.create(created);
    created.commit(this.eventBus);
    return created;
  }
}