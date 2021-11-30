import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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
  ) {}

  async execute(command: ExampleCreateCommand): Promise<Example> {
    const obj = Example.fromCommand(new ExampleId(), command.props);
    return this.repository.create(obj);
  }
}
