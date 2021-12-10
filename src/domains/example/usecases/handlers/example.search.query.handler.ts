import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { Examples } from '~/domains/example/entities/examples';
import { ExampleReadRepository } from '~/domains/example/repositories/example.read.repository';
import { ExampleSearchQuery } from '~/domains/example/usecases/example.srarch.query';

@QueryHandler(ExampleSearchQuery)
export class ExampleSearchQueryHandler
  implements IQueryHandler<ExampleSearchQuery>
{
  constructor(
    @Inject('ExampleReadRepository')
    private readonly repository: ExampleReadRepository,
  ) {}

  async execute(query: ExampleSearchQuery): Promise<Examples> {
    return this.repository.findByCondition(query.cond);
  }
}
