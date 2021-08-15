import { IsNotEmpty, IsNumberString } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  quantity: number;
  seller;
}
