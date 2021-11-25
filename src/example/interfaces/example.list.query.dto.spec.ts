import { ExampleListQueryDto } from './example.list.query.dto';

describe(ExampleListQueryDto.name, () => {
  describe(ExampleListQueryDto.toEntity.name, () => {
    it('エンティティに変換できる', () => {
      const testData = {
        email: 'test1',
        name: 'test2',
      };

      const dto = new ExampleListQueryDto();
      dto.email = testData.email;
      dto.name = testData.name;

      const entity = ExampleListQueryDto.toEntity(dto);
      expect(entity.email).toBe(testData.email);
      expect(entity.name).toBe(testData.name);
    });

    it('値を設定せずにエンティティに変換できる', () => {
      const dto = new ExampleListQueryDto();
      const entity = ExampleListQueryDto.toEntity(dto);
      expect(entity.email).toBeUndefined();
      expect(entity.name).toBeUndefined();
    });
  });
});
