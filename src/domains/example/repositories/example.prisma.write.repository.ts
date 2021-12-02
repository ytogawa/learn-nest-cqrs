import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailAddress } from '~/common/value-objects';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';
import { Example } from '~/domains/example/entities';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';
import { prisma } from '~/utils/prisma';

@Injectable()
export class ExamplePrismaWriteRepository implements ExampleWriteRepository {
  async create(item: Example): Promise<Example> {
    const saved = await prisma.example.create({
      data: {
        id: item.id,
        email: item.email,
        name: item.name,
        detail: item.detail,
      },
    });
    return Example.fromRepository(new ExampleId(saved.id), {
      email: new EmailAddress(saved.email),
      name: new Name(saved.name),
      detail: new Detail(saved.detail),
    });
  }

  async update(item: Example): Promise<Example> {
    const saved = await prisma.example.update({
      data: {
        email: item.email,
        name: item.name,
        detail: item.detail,
      },
      where: {
        id: item.id,
      },
    });
    return Example.fromRepository(new ExampleId(saved.id), {
      email: new EmailAddress(saved.email),
      name: new Name(saved.name),
      detail: new Detail(saved.detail),
    });
  }

  async getById(id: ExampleId): Promise<Example> {
    const found = await prisma.example.findUnique({
      where: { id: id.value },
      rejectOnNotFound: () =>
        new NotFoundException(`example not found. id=${id.value}`),
    });
    const example = Example.fromRepository(new ExampleId(found.id), {
      email: new EmailAddress(found.email),
      name: new Name(found.name),
      detail: new Detail(found.detail),
    });
    return example;
  }
}
