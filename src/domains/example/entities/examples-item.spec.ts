import { EmailAddress } from '~/common/value-objects';
import { ExamplesItem } from '~/domains/example/entities/examples-item';
import { ExampleId, Name } from '~/domains/example/value-objects';

describe(ExamplesItem.name, () => {
  describe(ExamplesItem.fromRepository.name, () => {
    it('インスタンスが生成できる', () => {
      const testData = {
        id: '064f288a-9e37-480c-9b47-7f3a84cf0af1',
        email: 'test_email@example.com',
        name: 'test_name',
      };
      const item = ExamplesItem.fromRepository(
        new ExampleId(testData.id),
        new EmailAddress(testData.email),
        new Name(testData.name),
      );
      expect(item).toBeDefined();
      expect(item.id).toBe('064f288a-9e37-480c-9b47-7f3a84cf0af1');
      expect(item.email).toBe('test_email@example.com');
      expect(item.name).toBe('test_name');
    });
  });
});
