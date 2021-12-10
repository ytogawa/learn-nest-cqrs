import { IsString, IsEmail, MaxLength, IsOptional } from 'class-validator';

import { EmailAddress } from '~/common/value-objects';
import { ExampleState } from '~/domains/example/entities';
import { Name, Detail } from '~/domains/example/value-objects';

export class ExampleUpdateDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(Detail.MAX_LENGTH)
  detail?: string;

  static toDomain(self: ExampleUpdateDto): Partial<ExampleState> {
    return {
      email: self.email && new EmailAddress(self.email),
      name: self.name && new Name(self.name),
      detail: self.detail && new Detail(self.detail),
    };
  }
}
