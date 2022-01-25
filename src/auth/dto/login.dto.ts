import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, NotContains } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @NotContains(' ', { message: "user name shouldn't countain white spaces" })
  username: string;

  @Length(6, 20)
  @ApiProperty()
  password: string;
}
