import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ExampleReadRepository } from '~/domains/example/repositories/example.read.repository';
import { ExamplePrismaReadRepository } from '~/domains/example/repositories';
import { ExampleDetailQueryHandler } from '~/domains/example/usecases/handlers/example.detail.query.handler';
import { ExampleDetail } from '~/domains/example/entities';
import { ExampleDetailQuery } from '~/domains/example/usecases/example.detail.query';
import { EmailAddress } from '~/common/value-objects';
import { ExampleId, Detail, Name } from '~/domains/example/value-objects';

describe(ExampleDetailQueryHandler.name, () => {
  let detailQuery: ExampleDetailQueryHandler;
  let repository: ExampleReadRepository;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ExampleDetailQueryHandler,
        {
          provide: 'ExampleReadRepository',
          useClass: ExamplePrismaReadRepository,
        },
      ],
    }).compile();
    await moduleRef.init();
    detailQuery = moduleRef.get<ExampleDetailQueryHandler>(
      ExampleDetailQueryHandler,
    );
    repository = moduleRef.get<
      'ExampleReadRepository',
      ExamplePrismaReadRepository
    >('ExampleReadRepository');
  });

  describe(ExampleDetailQueryHandler.prototype.execute.name, () => {
    it('リポジトリで検索した内容をそのまま返せる', async () => {
      const id = new ExampleId('4f0660c4-f77a-4ea9-bc82-55cd0e28c333');
      const testData = ExampleDetail.fromRepository(id, {
        email: new EmailAddress('test@example.com'),
        name: new Name('test'),
        detail: new Detail('test_detail'),
      });
      jest
        .spyOn(repository, 'findById')
        .mockReturnValue(Promise.resolve(testData));

      const exampleDetail = await detailQuery.execute(
        new ExampleDetailQuery(id),
      );
      expect(exampleDetail).toBe(testData);
    });
  });
});
