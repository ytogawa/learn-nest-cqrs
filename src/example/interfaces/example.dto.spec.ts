import { EmailAddress } from '~/common/valueObjects';
import { Example } from '~/example/entities/example';
import { Name, Detail, ExampleId } from '~/example/valueObjects';
import { ExampleDto } from '~/example/interfaces/example.dto';

describe(ExampleDto.name, () => {
  describe(ExampleDto.fromDomain.name, () => {
    it('エンティティから生成できる', () => {
      const testData = {
        id: '256f004a-7c78-426a-aab9-7bd8715e1eaf',
        email: 'test1',
        name: 'test2',
        detail: 'test3',
      };

      const example = Example.fromCommand(new ExampleId(testData.id), {
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
