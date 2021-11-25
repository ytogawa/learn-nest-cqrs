import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ExampleReadRepository } from '~/example/repositories/example.read.repository';
import { Examples } from '~/example/entities/examples';
import { ExampleSearchQuery } from '~/example/usecases/example.srarch.query';

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
