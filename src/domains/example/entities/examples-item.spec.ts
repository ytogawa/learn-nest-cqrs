import { EmailAddress } from '~/common/value-objects';
import { ExamplesItem } from '~/domains/example/entities/examples-item';
import { ExampleId, Name } from '~/domains/example/value-objects';

describe(ExamplesItem.name, () => {
  describe(ExamplesItem.fromRepository.name, () => {
    it('インスタンスが生成できる', () => {
      const testData = {
        id: new ExampleId('064f288a-9e37-480c-9b47-7f3a84cf0af1'),
        email: new EmailAddress('test_email@example.com'),
        name: new Name('test_name'),
      };
      const item = ExamplesItem.fromRepository(
        testData.id,
        testData.email,
        testData.name,
      );
      expect(item).toBeDefined();
      expect(item.id).toStrictEqual(testData.id);
      expect(item.email).toStrictEqual(testData.email);
      expect(item.name).toStrictEqual(testData.name);
    });
  });
});
