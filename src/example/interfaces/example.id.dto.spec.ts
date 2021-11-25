import { ExampleIdDto } from './example.id.dto';

describe(ExampleIdDto.name, () => {
  describe(ExampleIdDto.toDomain.name, () => {
    it('ドメイン層のオブジェクトに変換できる', () => {
      const testId = 'c28dec10-5e27-484d-a796-3debe860183e';
      const dto = new ExampleIdDto();
      dto.id = testId;

      const id = ExampleIdDto.toDomain(dto);
      expect(id.value).toBe(testId);
    });
  });
});
