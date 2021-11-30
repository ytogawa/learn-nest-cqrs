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
    const dto = new ExampleListDto();
    for (const example of examples) {
      dto.push({
        id: example.id.value,
        email: example.props.email.value,
        name: example.props.name.value,
      });
    }
    return dto;
  }
}
