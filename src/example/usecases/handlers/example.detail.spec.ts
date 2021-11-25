import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ExampleReadRepository } from '~/example/repositories/example.read.repository';
import { ExamplePrismaRepository } from '~/example/repositories/example.prisma.repository';
import { ExampleDetailQueryHandler } from '~/example/usecases/handlers/example.detail';
import { ExampleDetail } from '~/example/entities';
import { ExampleDetailQuery } from '../example.detail.query';
import { ExampleId, Detail, Email, Name } from '~/example/valueObjects';

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
          useClass: ExamplePrismaRepository,
        },
      ],
    }).compile();
    await moduleRef.init();
    detailQuery = moduleRef.get<ExampleDetailQueryHandler>(
      ExampleDetailQueryHandler,
    );
    repository = moduleRef.get<
      'ExampleReadRepository',
      ExamplePrismaRepository
    >('ExampleReadRepository');
  });

  describe(ExampleDetailQueryHandler.prototype.execute.name, () => {
    it('リポジトリで検索した内容をそのまま返せる', async () => {
      const id = new ExampleId('4f0660c4-f77a-4ea9-bc82-55cd0e28c333');
      const testData = ExampleDetail.fromRepository(id, {
        email: new Email('test@example.com'),
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
