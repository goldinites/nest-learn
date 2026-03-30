import { IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SignInDto {
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsString()
  password: string;
}
