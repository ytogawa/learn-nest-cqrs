import { IsNotEmpty, IsString } from 'class-validator';
import { ExampleId } from '~/domains/example/valueObjects';

export class ExampleIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  static toDomain(self: ExampleIdDto): ExampleId {
    return new ExampleId(self.id);
  }
}
