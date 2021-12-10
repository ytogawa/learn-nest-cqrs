import { Module } from '@nestjs/common';

import { EventEtcdRepository } from './repositories';
import { ExternalModule } from '~/externals';

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
