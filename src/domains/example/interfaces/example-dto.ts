import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';
import { Example } from '~/domains/example/entities';

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
      id: example.id,
      email: example.email,
      name: example.name,
      detail: example.detail,
    };
  }
}
