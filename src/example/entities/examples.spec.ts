import { EmailAddress } from '~/common/valueObjects';
import { Examples } from '~/example/entities/examples';
import { ExamplesItem } from '~/example/entities/examples.item';
import { ExampleId, Name } from '../valueObjects';

describe(Examples.name, () => {
  describe(Examples.fromRepository.name, () => {
    it('インスタンスが生成できる', () => {
      const examples = Examples.fromRepository();
      expect(examples).toBeDefined();
    });
  });

  describe(Examples.prototype.append.name, () => {
    it('項目を追加できる', () => {
      const testData = {
        id: '263fdf4e-90d2-4a93-ad44-e35b1acafbbc',
        email: 'test@example.com',
        name: 'test',
      };
      const examples = Examples.fromRepository();
      const item = ExamplesItem.fromRepository(
        new ExampleId(testData.id),
        new EmailAddress(testData.email),
        new Name(testData.name),
      );
      examples.append(item);
      for (const example of examples) {
        expect(example).toBe(item);
      }
    });
  });
});
