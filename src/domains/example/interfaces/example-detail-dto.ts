import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';

import { ExampleDetail } from '~/domains/example/entities';

export class ExampleDetailDto {
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

  static fromDomain(example: ExampleDetail): ExampleDetailDto {
    return {
      id: example.id.value,
      email: example.email.value,
      name: example.name.value,
      detail: example.detail.value,
    };
  }
}
