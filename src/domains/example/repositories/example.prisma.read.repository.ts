import { Injectable } from '@nestjs/common';
import { EmailAddress } from '~/common/value-objects';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';
import {
  Examples,
  ExamplesItem,
  ExampleSearchConditions,
  ExampleDetail,
} from '~/domains/example/entities';
import { ExampleReadRepository } from '~/domains/example/repositories/example.read.repository';
import { prisma } from '~/utils/prisma';

@Injectable()
export class ExamplePrismaReadRepository implements ExampleReadRepository {
  private toExamples(
    values: { id: string; email: string; name: string }[],
  ): Examples {
    return values.reduce((p, c) => {
      const item = ExamplesItem.fromRepository(
        new ExampleId(c.id),
        new EmailAddress(c.email),
        new Name(c.name),
      );
      p.push(item);
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
