import { Inject, Injectable } from '@nestjs/common';

import { ExampleCreated, ExampleUpdated } from '..';
import { EventRepository } from '~/common/repositories';
import { Example } from '~/domains/example/entities';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';
import { ExampleId } from '~/domains/example/value-objects';
import { prisma } from '~/utils/prisma';

const EVENT_PREFIX = 'Example';
@Injectable()
export class ExamplePrismaWriteRepository implements ExampleWriteRepository {
  constructor(
    @Inject('EventRepository')
    private eventRepository: EventRepository,
  ) {}

  async save(item: Example): Promise<void> {
    return this.eventRepository.store(EVENT_PREFIX, item.changes);
  }

  async create(item: ExampleCreated): Promise<void> {
    await prisma.example.create({
      data: {
        id: item.aggregateId.value,
        email: item.payload.email.value,
        name: item.payload.name.value,
        detail: item.payload.detail.value,
      },
    });
  }

  async update(item: ExampleUpdated): Promise<void> {
    await prisma.example.update({
      data: {
        email: item.payload.email?.value,
        name: item.payload.name?.value,
        detail: item.payload.detail?.value,
      },
      where: {
        id: item.aggregateId.value,
      },
    });
  }

  async getById(id: ExampleId): Promise<Example> {
    const events = await this.eventRepository.load(EVENT_PREFIX, id);
    const example = Example.fromRepository(id);
    example.loadsFromHistory(events);
    return example;
  }
}
