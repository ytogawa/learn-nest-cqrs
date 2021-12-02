import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';
import { Examples } from '~/domains/example/entities/examples';

export class ExampleListItemDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;
}

export class ExampleListDto extends Array<ExampleListItemDto> {
  static fromDomain(examples: Examples): ExampleListDto {
    return examples.map((example) => {
      return {
        id: example.id,
        email: example.email,
        name: example.name,
      };
    });
  }
}
