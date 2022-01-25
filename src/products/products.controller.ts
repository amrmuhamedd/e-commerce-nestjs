import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './products.Dto/creatproduct.dto';
import { UpdateProductDto } from './products.Dto/upadateProduct.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  getProductbyId(@Param('id') id: string) {
    return this.productsService.getProductbyId(id);
  }

  @Get('user/:id')
  getProductsByUserId(@Param('id') id: string) {
    return this.productsService.getProductsByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('cart/:id')
  addProductToCarts(@Param('id') id: string, @Body() amount: number) {
    return this.productsService.addToCart(id, amount);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('cart/products')
  getProductsinCart() {
    return this.productsService.getProductsCart();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('cart/remove/:id')
  removeproductFromCart(@Param('id') id: string) {
    return this.productsService.deleteProductFromCart(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, UpdateProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
