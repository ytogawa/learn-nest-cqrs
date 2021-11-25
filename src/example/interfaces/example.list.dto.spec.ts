import { Examples } from '~/example/entities/examples';
import { ExamplesItem } from '~/example/entities/examples.item';
import { Email, ExampleId, Name } from '~/example/valueObjects';
import { ExampleListDto } from '~/example/interfaces/example.list.dto';

describe(ExampleListDto.name, () => {
  describe(ExampleListDto.fromEntity.name, () => {
    it('エンティティから生成できる', () => {
      const testData = {
        id: '826fee31-a75b-46ba-8079-54b0fdb97faf',
        email: 'test@example.com',
        name: 'test',
      };
      const examples = Examples.fromRepository();
      examples.append(
        ExamplesItem.fromRepository(
          new ExampleId(testData.id),
          new Email(testData.email),
          new Name(testData.name),
        ),
      );
      const dto = ExampleListDto.fromEntity(examples);
      expect(dto.length).toBe(1);
      expect(dto[0].id).toBe(testData.id);
      expect(dto[0].email).toBe(testData.email);
      expect(dto[0].name).toBe(testData.name);
    });
  });
});
