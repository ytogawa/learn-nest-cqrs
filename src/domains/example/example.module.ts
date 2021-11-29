import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleController } from '~/domains/example/example.controller';
import * as Handlers from '~/domains/example/usecases/handlers';
import { ExamplePrismaRepository } from '~/domains/example/repositories/example.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ExampleController],
  providers: [
    ...Object.values(Handlers),
    {
      provide: 'ExampleWriteRepository',
      useClass: ExamplePrismaRepository,
    },
    {
      provide: 'ExampleReadRepository',
      useClass: ExamplePrismaRepository,
    },
  ],
})
export class ExampleModule {}
