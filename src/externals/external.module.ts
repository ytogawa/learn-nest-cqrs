import { Module, Global } from '@nestjs/common';
import { EtcdService } from './etcd.service';

@Global()
@Module({
  providers: [EtcdService],
})
export class ExternalModule {}
