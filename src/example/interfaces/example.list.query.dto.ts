import { IsOptional, IsString } from 'class-validator';
import { ExampleSearchConditions } from '~/example/entities/example.search.conditions';

export class ExampleListQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  static toDomain(self: ExampleListQueryDto): ExampleSearchConditions {
    return ExampleSearchConditions.fromQuery(self.email, self.name);
  }
}
