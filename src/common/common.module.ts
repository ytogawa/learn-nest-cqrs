import { Module } from '@nestjs/common';
import { ExternalModule } from '~/externals';
import { EventEtcdRepository } from './repositories';

@Module({
  imports: [ExternalModule],
  providers: [
    {
      provide: 'EventRepository',
      useClass: EventEtcdRepository,
    },
  ],
  exports: [
    {
      provide: 'EventRepository',
      useClass: EventEtcdRepository,
    },
  ],
})
export class CommonModule {}
