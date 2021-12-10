import { Module } from '@nestjs/common';

import { ExternalModule } from './externals/external.module';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { ExampleModule } from '~/domains/example/example.module';

@Module({
  imports: [ExternalModule, ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
