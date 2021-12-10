import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { EmailAddress } from '~/common/value-objects';
import { Example, ExampleState } from '~/domains/example/entities';
import { ExamplePrismaWriteRepository } from '~/domains/example/repositories';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';
import { ExampleUpdateCommand } from '~/domains/example/usecases/example.update.command';
import { ExampleUpdateCommandHandler } from '~/domains/example/usecases/handlers/example.update.command.handler';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';

describe(ExampleUpdateCommandHandler.name, () => {
  let updateCommand: ExampleUpdateCommandHandler;
  let repository: ExampleWriteRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ExampleUpdateCommandHandler,
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
    updateCommand = moduleRef.get<ExampleUpdateCommandHandler>(
      ExampleUpdateCommandHandler,
    );
    repository = moduleRef.get<
      'ExampleWriteRepository',
      ExamplePrismaWriteRepository
    >('ExampleWriteRepository');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe(ExampleUpdateCommandHandler.prototype.execute.name, () => {
    it('Exampleを更新できる', async () => {
      const id = new ExampleId('02790f45-e69f-440a-a03e-f106b5172efc');
      const example = Example.create(id, {
        email: new EmailAddress('test@example.com'),
        name: new Name('test'),
        detail: new Detail('test_detail'),
      });
      example.reset();

      jest.spyOn(repository, 'getById').mockResolvedValue(example);
      jest.spyOn(repository, 'update').mockResolvedValue();

      const testData = {
        email: new EmailAddress('updated@example.com'),
        name: new Name('updated'),
        detail: new Detail('updated_detail'),
      };
      const updateState: ExampleState = {
        email: testData.email,
        name: testData.name,
        detail: testData.detail,
      };

      const updated = await updateCommand.execute(
        new ExampleUpdateCommand(id, updateState),
      );

      expect(updated.email).toStrictEqual(testData.email);
      expect(updated.name).toStrictEqual(testData.name);
      expect(updated.detail).toStrictEqual(testData.detail);
    });

    it('Exampleを部分更新できる', async () => {
      const id = new ExampleId('02790f45-e69f-440a-a03e-f106b5172efc');
      const example = Example.create(id, {
        email: new EmailAddress('test@example.com'),
        name: new Name('test'),
        detail: new Detail('test_detail'),
      });

      jest.spyOn(repository, 'getById').mockResolvedValue(example);
      jest.spyOn(repository, 'update').mockResolvedValue();

      const testData = {
        name: new Name('updated'),
      };

      const updated = await updateCommand.execute(
        new ExampleUpdateCommand(id, testData),
      );

      expect(updated.email).toStrictEqual(example.email);
      expect(updated.name).toStrictEqual(testData.name);
      expect(updated.detail).toStrictEqual(example.detail);
    });
  });
});
