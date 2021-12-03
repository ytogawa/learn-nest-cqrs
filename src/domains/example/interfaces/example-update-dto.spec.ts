import { ExampleUpdateDto } from './example-update-dto';

describe(ExampleUpdateDto.name, () => {
  describe(ExampleUpdateDto.toDomain.name, () => {
    it('ドメイン層のオブジェクトに変換できる', () => {
      const testData = {
        email: 'test@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };

      const dto = new ExampleUpdateDto();
      dto.email = testData.email;
      dto.name = testData.name;
      dto.detail = testData.detail;

      const state = ExampleUpdateDto.toDomain(dto);
      expect(state.email.value).toBe(testData.email);
      expect(state.name.value).toBe(testData.name);
      expect(state.detail.value).toBe(testData.detail);
    });
  });
});
