import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ExampleReadRepository } from '~/example/repositories/example.read.repository';
import { ExampleDetail } from '~/example/entities';
import { ExampleDetailQuery } from '~/example/usecases/example.detail.query';

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
