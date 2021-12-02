import { Example } from './example';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';
import { EmailAddress } from '~/common/value-objects';

describe(Example.name, () => {
  describe('空のインスタンスが生成できる', () => {
    const testId = '5d03968a-e7a4-43ce-9f55-0eb1707410cb';
    const example = new Example(new ExampleId(testId));
    expect(example).toBeDefined();
    expect(example.email).toBeUndefined();
    expect(example.name).toBeUndefined();
    expect(example.detail).toBeUndefined();
  });

  describe(Example.prototype.withCreate.name, () => {
    it('インスタンスが生成できる', () => {
      const testData = {
        id: '064f288a-9e37-480c-9b47-7f3a84cf0af1',
        email: 'test_email@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };
      const example = new Example(new ExampleId(testData.id));
      const created = example.withCreate({
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      });

      expect(created).toBeDefined();
      expect(created.email).toBe(testData.email);
      expect(created.name).toBe(testData.name);
      expect(created.detail).toBe(testData.detail);
    });
  });

  describe(Example.prototype.withUpdate.name, () => {
    it('インスタンスを更新できる', () => {
      const example = new Example(
        new ExampleId('064f288a-9e37-480c-9b47-7f3a84cf0af1'),
        {
          email: new EmailAddress('test_email@example.com'),
          name: new Name('test_name'),
          detail: new Detail('test_detail'),
        },
      );
      const testData = {
        email: new EmailAddress('updated@example.com'),
        name: new Name('updated_name'),
        detail: new Detail('updated_detail'),
      };
      const updated = example.withUpdate(testData);

      expect(updated).toBeDefined();
      expect(updated.email).toBe(testData.email.value);
      expect(updated.name).toBe(testData.name.value);
      expect(updated.detail).toBe(testData.detail.value);
    });
  });
});
