import { EmailAddress } from '~/common/value-objects';
import { ExampleDetail } from '~/domains/example/entities/example-detail';
import { ExampleId, Name, Detail } from '~/domains/example/value-objects';

describe(ExampleDetail.name, () => {
  describe(ExampleDetail.fromRepository.name, () => {
    it('インスタンスが生成できる', () => {
      const testData = {
        id: '064f288a-9e37-480c-9b47-7f3a84cf0af1',
        email: 'test_email@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };
      const example = ExampleDetail.fromRepository(new ExampleId(testData.id), {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      });
      expect(example).toBeDefined();
      expect(example.email).toBe(testData.email);
      expect(example.name).toBe(testData.name);
      expect(example.detail).toBe(testData.detail);
    });
  });
});
