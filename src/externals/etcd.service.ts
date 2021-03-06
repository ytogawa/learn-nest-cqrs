import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService extends Etcd3 {
  constructor() {
    super({ hosts: process.env.REDIS_HOSTS });
  }
}
