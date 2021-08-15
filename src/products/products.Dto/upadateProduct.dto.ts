import { IsOptional } from 'class-validator';
export class UpdateProductDto {
  @IsOptional()
  name: string;
  @IsOptional()
  description: string;
  @IsOptional()
  quantity: number;
  seller;
}
