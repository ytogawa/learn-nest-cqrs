import { Example } from './example';
import { EmailAddress } from '~/common/value-objects';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';

describe(Example.name, () => {
  describe(Example.create.name, () => {
    it('インスタンスが生成できる', () => {
      const testData = {
        id: new ExampleId('064f288a-9e37-480c-9b47-7f3a84cf0af1'),
        email: new EmailAddress('test_email@example.com'),
        name: new Name('test_name'),
        detail: new Detail('test_detail'),
      };
      const created = Example.create(testData.id, {
        email: testData.email,
        name: testData.name,
        detail: testData.detail,
      });

      expect(created).toBeDefined();
      expect(created.email).toStrictEqual(testData.email);
      expect(created.name).toStrictEqual(testData.name);
      expect(created.detail).toStrictEqual(testData.detail);
    });
  });

  describe(Example.prototype.withUpdate.name, () => {
    it('インスタンスを更新できる', () => {
      const example = Example.create(
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
      expect(updated.email).toStrictEqual(testData.email);
      expect(updated.name).toStrictEqual(testData.name);
      expect(updated.detail).toStrictEqual(testData.detail);
    });
  });
});
