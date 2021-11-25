import { Example } from './example';
import { ExampleId, Name, Email, Detail } from '../valueObjects';

describe(Example.name, () => {
  describe(Example.fromCommand.name, () => {
    it('インスタンスが生成できる', () => {
      const testData = {
        id: '064f288a-9e37-480c-9b47-7f3a84cf0af1',
        email: 'test_email@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };
      const example = Example.fromCommand(new ExampleId(testData.id), {
        email: new Email(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      });
      expect(example).toBeDefined();
      expect(example.props.email.value).toBe(testData.email);
      expect(example.props.name.value).toBe(testData.name);
      expect(example.props.detail.value).toBe(testData.detail);
    });
  });
});
