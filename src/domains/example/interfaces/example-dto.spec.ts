import { EmailAddress } from '~/common/value-objects';
import { Example } from '~/domains/example/entities/example';
import { Name, Detail, ExampleId } from '~/domains/example/value-objects';
import { ExampleDto } from '~/domains/example/interfaces/example-dto';

describe(ExampleDto.name, () => {
  describe(ExampleDto.fromDomain.name, () => {
    it('エンティティから生成できる', () => {
      const testData = {
        id: '256f004a-7c78-426a-aab9-7bd8715e1eaf',
        email: 'test@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };

      const example = Example.create(new ExampleId(testData.id), {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      });

      const dto = ExampleDto.fromDomain(example);
      expect(dto.id).toBe(testData.id);
      expect(dto.email).toBe(testData.email);
      expect(dto.name).toBe(testData.name);
      expect(dto.detail).toBe(testData.detail);
    });
  });
});
