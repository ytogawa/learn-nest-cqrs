import { EmailAddress } from '~/common/valueObjects';
import { ExamplesItem } from '~/example/entities/examples.item';
import { ExampleId, Name } from '~/example/valueObjects';

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
      expect(item.id.value).toBe('064f288a-9e37-480c-9b47-7f3a84cf0af1');
      expect(item.props.email.value).toBe('test_email@example.com');
      expect(item.props.name.value).toBe('test_name');
    });
  });
});
