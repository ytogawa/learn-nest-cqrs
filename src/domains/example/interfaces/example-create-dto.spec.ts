import { ExampleCreateDto } from './example-create-dto';

describe(ExampleCreateDto.name, () => {
  describe(ExampleCreateDto.toDomain.name, () => {
    it('ドメイン層のオブジェクトに変換できる', () => {
      const testData = {
        email: 'test@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };

      const dto = new ExampleCreateDto();
      dto.email = testData.email;
      dto.name = testData.name;
      dto.detail = testData.detail;

      const state = ExampleCreateDto.toDomain(dto);
      expect(state.email.value).toBe(testData.email);
      expect(state.name.value).toBe(testData.name);
      expect(state.detail.value).toBe(testData.detail);
    });
  });
});
