import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Example, ExampleProps } from '~/domains/example/entities';
import { ExamplePrismaWriteRepository } from '~/domains/example/repositories';
import { EmailAddress } from '~/common/value-objects';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import { ExampleCreateCommandHandler } from './example.create';
import { ExampleCreateCommand } from '~/domains/example/usecases/example.create.command';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';

describe(ExampleCreateCommandHandler.name, () => {
  let createCommand: ExampleCreateCommandHandler;
  let repository: ExampleWriteRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ExampleCreateCommandHandler,
        {
          provide: 'ExampleWriteRepository',
          useClass: ExamplePrismaWriteRepository,
        },
      ],
    }).compile();
    await moduleRef.init();
    createCommand = moduleRef.get<ExampleCreateCommandHandler>(
      ExampleCreateCommandHandler,
    );
    repository = moduleRef.get<
      'ExampleWriteRepository',
      ExamplePrismaWriteRepository
    >('ExampleWriteRepository');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe(ExampleCreateCommandHandler.prototype.execute.name, () => {
    it('Exampleを生成できる', async () => {
      const testData = {
        id: '02790f45-e69f-440a-a03e-f106b5172efc',
        email: 'test@example.com',
        name: 'test',
        detail: 'test_detail',
      };
      const props: ExampleProps = {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      };
      const example = Example.fromRepository(new ExampleId(testData.id), props);
      jest.spyOn(repository, 'create').mockResolvedValue(example);

      const result = await createCommand.execute(
        new ExampleCreateCommand(props),
      );

      expect(result).toBe(example);
    });
  });
});
