import { ExampleListQueryDto } from '~/domains/example/interfaces/example.list.query.dto';

describe(ExampleListQueryDto.name, () => {
  describe(ExampleListQueryDto.toDomain.name, () => {
    it('エンティティに変換できる', () => {
      const testData = {
        email: 'test1',
        name: 'test2',
      };

      const dto = new ExampleListQueryDto();
      dto.email = testData.email;
      dto.name = testData.name;

      const conditions = ExampleListQueryDto.toDomain(dto);
      expect(conditions.email).toBe(testData.email);
      expect(conditions.name).toBe(testData.name);
    });

    it('値を設定せずにエンティティに変換できる', () => {
      const dto = new ExampleListQueryDto();
      const conditions = ExampleListQueryDto.toDomain(dto);
      expect(conditions.email).toBeUndefined();
      expect(conditions.name).toBeUndefined();
    });
  });
});
