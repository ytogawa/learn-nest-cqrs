import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ExampleReadRepository } from '~/example/repositories/example.read.repository';
import { ExamplePrismaRepository } from '~/example/repositories/example.prisma.repository';
import { ExampleSearchQueryHandler } from '~/example/usecases/handlers/example.search';
import { ExampleSearchQuery } from '~/example/usecases/example.srarch.query';
import { Examples, ExampleSearchConditions } from '~/example/entities';

describe(ExampleSearchQueryHandler.name, () => {
  let searchQuery: ExampleSearchQueryHandler;
  let repository: ExampleReadRepository;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ExampleSearchQueryHandler,
        {
          provide: 'ExampleReadRepository',
          useClass: ExamplePrismaRepository,
        },
      ],
    }).compile();
    await moduleRef.init();
    searchQuery = moduleRef.get<ExampleSearchQueryHandler>(
      ExampleSearchQueryHandler,
    );
    repository = moduleRef.get<
      'ExampleReadRepository',
      ExamplePrismaRepository
    >('ExampleReadRepository');
  });

  describe(ExampleSearchQueryHandler.prototype.execute.name, () => {
    it('リポジトリで検索した内容をそのまま返せる', async () => {
      const testData = Examples.fromRepository();
      jest
        .spyOn(repository, 'findByCondition')
        .mockReturnValue(Promise.resolve(testData));

      const cond = ExampleSearchConditions.fromQuery();
      const examples = await searchQuery.execute(new ExampleSearchQuery(cond));

      expect(examples).toBe(testData);
    });
  });
});
