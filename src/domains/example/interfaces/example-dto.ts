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
      id: example.id.value,
      email: example.email.value,
      name: example.name.value,
      detail: example.detail.value,
    };
  }
}
