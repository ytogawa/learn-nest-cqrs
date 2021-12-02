import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleController } from '~/domains/example/example.controller';
import * as Handlers from '~/domains/example/usecases/handlers';
import {
  ExamplePrismaReadRepository,
  ExamplePrismaWriteRepository,
} from '~/domains/example/repositories';

@Module({
  imports: [CqrsModule],
  controllers: [ExampleController],
  providers: [
    ...Object.values(Handlers),
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
