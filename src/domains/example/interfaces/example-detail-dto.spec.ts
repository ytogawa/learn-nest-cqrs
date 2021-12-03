import { EmailAddress } from '~/common/value-objects';
import { ExampleDetail } from '~/domains/example/entities';
import { Name, Detail, ExampleId } from '~/domains/example/value-objects';
import { ExampleDetailDto } from '~/domains/example/interfaces/example-detail-dto';

describe(ExampleDetailDto.name, () => {
  describe(ExampleDetailDto.fromDomain.name, () => {
    it('エンティティから生成できる', () => {
      const testData = {
        id: '68e1ad57-e6cd-4b67-ba79-8ecb8ac77e7c',
        email: 'test@example.com',
        name: 'test_name',
        detail: 'test_detail',
      };

      const example = ExampleDetail.fromRepository(new ExampleId(testData.id), {
        email: new EmailAddress(testData.email),
        name: new Name(testData.name),
        detail: new Detail(testData.detail),
      });

      const dto = ExampleDetailDto.fromDomain(example);
      expect(dto.id).toBe(testData.id);
      expect(dto.email).toBe(testData.email);
      expect(dto.name).toBe(testData.name);
      expect(dto.detail).toBe(testData.detail);
    });
  });
});
