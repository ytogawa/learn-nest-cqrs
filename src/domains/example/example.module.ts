import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommonModule } from '~/common';
import * as EventHandlers from '~/domains/example/events/handlers';
import { ExampleController } from '~/domains/example/example.controller';
import {
  ExamplePrismaReadRepository,
  ExamplePrismaWriteRepository,
} from '~/domains/example/repositories';
import * as Handlers from '~/domains/example/usecases/handlers';

@Module({
  imports: [CqrsModule, CommonModule],
  controllers: [ExampleController],
  providers: [
    ...Object.values(Handlers),
    ...Object.values(EventHandlers),
    {
      provide: 'ExampleWriteRepository',
      useClass: ExamplePrismaWriteRepository,
    },
    {
      provide: 'ExampleReadRepository',
      useClass: ExamplePrismaReadRepository,
    },
  ],
})
export class ExampleModule {}
