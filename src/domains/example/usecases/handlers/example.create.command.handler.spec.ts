import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { EmailAddress } from '~/common/value-objects';
import { Example, ExampleState } from '~/domains/example/entities';
import { ExamplePrismaWriteRepository } from '~/domains/example/repositories';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';
import { ExampleCreateCommand } from '~/domains/example/usecases/example.create.command';
import { ExampleCreateCommandHandler } from '~/domains/example/usecases/handlers/example.create.command.handler';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import { generateUuid } from '~/utils/generate-uuid';

jest.mock('~/utils/generate-uuid');

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
        {
          provide: 'EventRepository',
          useValue: { store: jest.fn() },
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
      const state: ExampleState = {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      };
      const example = Example.fromRepository(new ExampleId(testData.id), state);
      jest.spyOn(repository, 'create').mockResolvedValue(Promise.resolve());

      if (!jest.isMockFunction(generateUuid)) {
        throw new Error('generateUuid is not mock.');
      }

      generateUuid.mockReturnValue(testData.id);

      const result = await createCommand.execute(
        new ExampleCreateCommand(state),
      );

      expect(result).toStrictEqual(example);
    });
  });
});
