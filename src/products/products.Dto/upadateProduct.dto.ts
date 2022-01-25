import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UpdateProductDto {
  @IsOptional()
  @ApiProperty()
  name: string;
  @IsOptional()
  @ApiProperty()
  description: string;
  @IsOptional()
  @ApiProperty()
  quantity: number;
  seller;
}
