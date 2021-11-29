import { Injectable } from '@nestjs/common';
import { EmailAddress } from '~/common/valueObjects';
import { ExampleId, Name, Detail } from '~/example/valueObjects';
import {
  Example,
  Examples,
  ExamplesItem,
  ExampleSearchConditions,
  ExampleDetail,
} from '~/example/entities';
import { ExampleWriteRepository } from '~/example/repositories/example.write.repository';
import { ExampleReadRepository } from '~/example/repositories/example.read.repository';
import { prisma } from '~/utils/prisma';

@Injectable()
export class ExamplePrismaRepository
  implements ExampleWriteRepository, ExampleReadRepository
{
  async create(item: Example): Promise<Example> {
    const saved = await prisma.example.create({
      data: {
        id: item.id.value,
        email: item.props.email.value,
        name: item.props.name.value,
        detail: item.props.detail.value,
      },
    });
    return Example.fromRepository(new ExampleId(saved.id), {
      email: new EmailAddress(saved.email),
      name: new Name(saved.name),
      detail: new Detail(saved.detail),
    });
  }

  private toExamples(
    values: { id: string; email: string; name: string }[],
  ): Examples {
    return values.reduce((p, c) => {
      const item = ExamplesItem.fromRepository(
        new ExampleId(c.id),
        new EmailAddress(c.email),
        new Name(c.name),
      );
      p.append(item);
      return p;
    }, Examples.fromRepository());
  }

  async findByCondition(cond: ExampleSearchConditions): Promise<Examples> {
    const found = await prisma.example.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: {
        email: { contains: cond.email },
        name: { contains: cond.name },
      },
    });
    return this.toExamples(found);
  }

  async findById(id: ExampleId): Promise<ExampleDetail> {
    const found = await prisma.example.findUnique({ where: { id: id.value } });
    const example = ExampleDetail.fromRepository(new ExampleId(found.id), {
      email: new EmailAddress(found.email),
      name: new Name(found.name),
      detail: new Detail(found.detail),
    });
    return example;
  }
}
