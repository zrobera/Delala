import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';
// import { IsPositive } from 'class-validator/types/decorator/decorators';

export class CreateUserDto {
  userName: string;
  //   @IsStrongPassword()
  password: string;
  @IsEmail()
  email: string;
  @IsOptional()
  role: string;
}
