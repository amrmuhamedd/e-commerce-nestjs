import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
  seller;
}
