import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';
import { EmailAddress } from '~/common/valueObjects';
import { ExampleProps } from '~/example/entities/example.props';
import { Name, Detail } from '~/example/valueObjects';

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

  static toDomain(self: ExampleCreateDto): ExampleProps {
    return {
      email: new EmailAddress(self.email),
      name: new Name(self.name),
      detail: new Detail(self.detail),
    };
  }
}
