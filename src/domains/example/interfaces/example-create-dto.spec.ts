import { ExampleCreateDto } from './example-create-dto';

describe(ExampleCreateDto.name, () => {
  describe(ExampleCreateDto.toDomain.name, () => {
    it('ドメイン層のオブジェクトに変換できる', () => {
      const testData = {
        email: 'test1',
        name: 'test2',
        detail: 'test3',
      };

      const dto = new ExampleCreateDto();
      dto.email = testData.email;
      dto.name = testData.name;
      dto.detail = testData.detail;

      const entity = ExampleCreateDto.toDomain(dto);
      expect(entity.email.value).toBe(testData.email);
      expect(entity.name.value).toBe(testData.name);
      expect(entity.detail.value).toBe(testData.detail);
    });
  });
});
