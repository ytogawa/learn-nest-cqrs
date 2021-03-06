import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ExampleDetail } from '~/domains/example/entities';
import { ExampleReadRepository } from '~/domains/example/repositories/example.read.repository';
import { ExampleDetailQuery } from '~/domains/example/usecases/example.detail.query';

@QueryHandler(ExampleDetailQuery)
export class ExampleDetailQueryHandler
  implements IQueryHandler<ExampleDetailQuery>
{
  constructor(
    @Inject('ExampleReadRepository')
    private readonly repository: ExampleReadRepository,
  ) {}

  async execute(query: ExampleDetailQuery): Promise<ExampleDetail> {
    return this.repository.findById(query.id);
  }
}
