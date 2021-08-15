import { IsEmail, IsNotEmpty, Length, NotContains } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @NotContains(' ', { message: "user name shouldn't countain white spaces" })
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  roles: string;
  _id;
}
