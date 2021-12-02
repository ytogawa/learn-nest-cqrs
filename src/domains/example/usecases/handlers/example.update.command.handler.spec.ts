import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Example, ExampleProps } from '~/domains/example/entities';
import { ExamplePrismaWriteRepository } from '~/domains/example/repositories';
import { EmailAddress } from '~/common/value-objects';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import { ExampleUpdateCommandHandler } from '~/domains/example/usecases/handlers/example.update.command.handler';
import { ExampleUpdateCommand } from '~/domains/example/usecases/example.update.command';
import { ExampleWriteRepository } from '~/domains/example/repositories/example.write.repository';

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
      const example = new Example(id, {
        email: new EmailAddress('test@example.com'),
        name: new Name('test'),
        detail: new Detail('test_detail'),
      });

      jest.spyOn(repository, 'getById').mockResolvedValue(example);
      jest
        .spyOn(repository, 'update')
        .mockImplementation((v) => Promise.resolve(v));

      const testData = {
        email: 'updated@example.com',
        name: 'updated',
        detail: 'updated_detail',
      };
      const updateProps: ExampleProps = {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      };

      const updated = await updateCommand.execute(
        new ExampleUpdateCommand(id, updateProps),
      );

      expect(updated.email).toBe(testData.email);
      expect(updated.name).toBe(testData.name);
      expect(updated.detail).toBe(testData.detail);
    });

    it('Exampleを部分更新できる', async () => {
      const id = new ExampleId('02790f45-e69f-440a-a03e-f106b5172efc');
      const example = new Example(id, {
        email: new EmailAddress('test@example.com'),
        name: new Name('test'),
        detail: new Detail('test_detail'),
      });

      jest.spyOn(repository, 'getById').mockResolvedValue(example);
      jest
        .spyOn(repository, 'update')
        .mockImplementation((v) => Promise.resolve(v));

      const testData = {
        name: 'updated',
      };
      const updateProps: Partial<ExampleProps> = {
        name: new Name(testData.name),
      };

      const updated = await updateCommand.execute(
        new ExampleUpdateCommand(id, updateProps),
      );

      expect(updated.email).toBe(example.email);
      expect(updated.name).toBe(testData.name);
      expect(updated.detail).toBe(example.detail);
    });
  });
});
