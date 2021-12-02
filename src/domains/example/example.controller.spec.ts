import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleController } from '~/domains/example/example.controller';
import {
  ExampleCreateCommandHandler,
  ExampleUpdateCommandHandler,
  ExampleSearchQueryHandler,
  ExampleDetailQueryHandler,
} from '~/domains/example/usecases/handlers';
import {
  ExamplePrismaReadRepository,
  ExamplePrismaWriteRepository,
} from '~/domains/example/repositories';
import {
  Example,
  Examples,
  ExamplesItem,
  ExampleDetail,
} from '~/domains/example/entities';
import { Detail, ExampleId, Name } from '~/domains/example/value-objects';
import {
  ExampleCreateDto,
  ExampleUpdateDto,
  ExampleDetailDto,
  ExampleDto,
  ExampleListDto,
  ExampleListQueryDto,
} from '~/domains/example/interfaces';
import { EmailAddress } from '~/common/value-objects';

describe(ExampleController.name, () => {
  let controller: ExampleController;
  let createCommand: ExampleCreateCommandHandler;
  let updateCommand: ExampleUpdateCommandHandler;
  let searchQuery: ExampleSearchQueryHandler;
  let detailQuery: ExampleDetailQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ExampleController],
      providers: [
        ExampleCreateCommandHandler,
        ExampleUpdateCommandHandler,
        ExampleSearchQueryHandler,
        ExampleDetailQueryHandler,
        {
          provide: 'ExampleWriteRepository',
          useClass: ExamplePrismaWriteRepository,
        },
        {
          provide: 'ExampleReadRepository',
          useClass: ExamplePrismaReadRepository,
        },
      ],
    }).compile();

    await moduleRef.init();

    controller = moduleRef.get<ExampleController>(ExampleController);
    createCommand = moduleRef.get<ExampleCreateCommandHandler>(
      ExampleCreateCommandHandler,
    );
    updateCommand = moduleRef.get<ExampleUpdateCommandHandler>(
      ExampleUpdateCommandHandler,
    );
    searchQuery = moduleRef.get<ExampleSearchQueryHandler>(
      ExampleSearchQueryHandler,
    );
    detailQuery = moduleRef.get<ExampleDetailQueryHandler>(
      ExampleDetailQueryHandler,
    );
  });

  describe(ExampleController.prototype.post.name, () => {
    it('Exampleを作成できる', async () => {
      const testId = '6e585c42-3218-4494-a2c3-70e594d953d4';
      const testDto = new ExampleCreateDto();
      testDto.email = 'test_email@example.com';
      testDto.name = 'test_name';
      testDto.detail = 'test_detail';

      const example = new Example(new ExampleId(testId), {
        email: new EmailAddress(testDto.email),
        name: new Name(testDto.name),
        detail: new Detail(testDto.detail),
      });
      jest
        .spyOn(createCommand, 'execute')
        .mockImplementation((_cmd) => Promise.resolve(example));

      const response = ExampleDto.fromDomain(example);
      expect(await controller.post(testDto)).toStrictEqual(response);
      expect(createCommand.execute).toBeCalled();
    });
  });

  describe(ExampleController.prototype.patch.name, () => {
    it('Exampleを更新できる', async () => {
      const testId = '322f6d29-0ce5-4443-a487-0bf2b0f8462a';
      const example = new Example(new ExampleId(testId), {
        email: new EmailAddress('test_email@example.com'),
        name: new Name('test_name'),
        detail: new Detail('test_detail'),
      });
      jest
        .spyOn(updateCommand, 'execute')
        .mockImplementation((_cmd) => Promise.resolve(example));

      const testDto = new ExampleUpdateDto();
      const response = ExampleDto.fromDomain(example);
      expect(await controller.patch(testDto)).toStrictEqual(response);
      expect(updateCommand.execute).toBeCalled();
    });
  });

  describe(ExampleController.prototype.list.name, () => {
    it('Exampleを検索できる', async () => {
      const testData = [
        {
          id: '795e7a60-9902-450c-8b27-488028c9cf9a',
          email: 'test1@example.com',
          name: 'test1',
        },
        {
          id: '952f2886-cb96-4ba1-b0f0-89d42688f708',
          email: 'test2@example.com',
          name: 'test2',
        },
      ];
      const examples = testData.reduce((p, c) => {
        p.push(
          ExamplesItem.fromRepository(
            new ExampleId(c.id),
            new EmailAddress(c.email),
            new Name(c.name),
          ),
        );
        return p;
      }, Examples.fromRepository());

      jest
        .spyOn(searchQuery, 'execute')
        .mockImplementation((_query) => Promise.resolve(examples));

      const request = new ExampleListQueryDto();
      const response = ExampleListDto.fromDomain(examples);
      expect(await controller.list(request)).toStrictEqual(response);
      expect(searchQuery.execute).toBeCalled();
    });
  });

  describe(ExampleController.prototype.get.name, () => {
    it('Exampleの詳細を取得できる', async () => {
      const testData = {
        id: 'd6e34441-d2b4-4027-8f27-3a86219f2c0a',
        email: 'test1@example.com',
        name: 'test1',
        detail: 'testtesttesttesttest',
      };
      const detail = ExampleDetail.fromRepository(new ExampleId(testData.id), {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      });

      jest
        .spyOn(detailQuery, 'execute')
        .mockImplementation((_query) => Promise.resolve(detail));

      const request = new ExampleDetailDto();
      request.id = detail.id;

      const response = await controller.get(request);
      expect(response).toBeDefined();
      expect(response).toStrictEqual(testData);

      expect(detailQuery.execute).toBeCalled();
    });
  });
});
