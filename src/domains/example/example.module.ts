import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleController } from '~/domains/example/example.controller';
import * as Handlers from '~/domains/example/usecases/handlers';
import * as EventHandlers from '~/domains/example/events/handlers';
import {
  ExamplePrismaReadRepository,
  ExamplePrismaWriteRepository,
} from '~/domains/example/repositories';
import { EtcdService } from '~/externals';
import { CommonModule, EventEtcdRepository } from '~/common';

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
