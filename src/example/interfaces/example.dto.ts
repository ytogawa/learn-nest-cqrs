import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';
import { Example } from '~/example/entities';

export class ExampleDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  static fromDomain(example: Example): ExampleDto {
    return {
      id: example.id.value,
      email: example.props.email.value,
      name: example.props.name.value,
      detail: example.props.detail.value,
    };
  }
}
