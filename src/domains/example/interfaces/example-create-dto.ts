import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';
import { EmailAddress } from '~/common/value-objects';
import { ExampleState } from '~/domains/example/entities';
import { Name, Detail } from '~/domains/example/value-objects';

export class ExampleCreateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(Detail.MAX_LENGTH)
  detail: string;

  static toDomain(self: ExampleCreateDto): ExampleState {
    return {
      email: new EmailAddress(self.email),
      name: new Name(self.name),
      detail: new Detail(self.detail),
    };
  }
}
