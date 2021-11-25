import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleController } from './example.controller';
import * as Handlers from './usecases/handlers';
import { ExamplePrismaRepository } from './repositories/example.prisma.repository';

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
