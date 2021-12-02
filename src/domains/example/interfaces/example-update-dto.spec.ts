import { ExampleUpdateDto } from './example-update-dto';

describe(ExampleUpdateDto.name, () => {
  describe(ExampleUpdateDto.toDomain.name, () => {
    it('ドメイン層のオブジェクトに変換できる', () => {
      const testData = {
        email: 'test1',
        name: 'test2',
        detail: 'test3',
      };

      const dto = new ExampleUpdateDto();
      dto.email = testData.email;
      dto.name = testData.name;
      dto.detail = testData.detail;

      const props = ExampleUpdateDto.toDomain(dto);
      expect(props.email.value).toBe(testData.email);
      expect(props.name.value).toBe(testData.name);
      expect(props.detail.value).toBe(testData.detail);
    });
  });
});
