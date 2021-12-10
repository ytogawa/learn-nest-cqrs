import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Example } from '~/domains/example/entities';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';
import { ExampleUpdateCommand } from '~/domains/example/usecases/example.update.command';

@CommandHandler(ExampleUpdateCommand)
export class ExampleUpdateCommandHandler
  implements ICommandHandler<ExampleUpdateCommand>
{
  constructor(
    @Inject('ExampleWriteRepository')
    private readonly repository: ExampleWriteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ExampleUpdateCommand): Promise<Example> {
    const example = await this.repository.getById(command.id);
    const updated = example.withUpdate(command.state);
    await this.repository.save(updated);
    updated.commit(this.eventBus);
    return updated;
  }
}
