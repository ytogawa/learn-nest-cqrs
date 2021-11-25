import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExampleWriteRepository } from '~/example/repositories/example.write.repository';
import { Example } from '~/example/entities';
import { ExampleCreateCommand } from '~/example/usecases/example.create.command';
import { ExampleId } from '~/example/valueObjects';

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
