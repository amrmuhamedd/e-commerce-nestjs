import { ProductsService } from './products.service';
import { CreateProductDto } from './products.Dto/creatproduct.dto';
import { UpdateProductDto } from './products.Dto/upadateProduct.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("./models/products").Products[]>;
    createProduct(createProductDto: CreateProductDto): Promise<import("./models/products").Products>;
    getProductbyId(id: string): Promise<import("./models/products").ProductDocumenet>;
    getProductsByUserId(id: string): Promise<any>;
    addProductToCarts(id: string, amount: number): Promise<{
        message: string;
    }>;
    getProductsinCart(): Promise<any>;
    removeproductFromCart(id: string): Promise<string>;
    update(id: string, UpdateProductDto: UpdateProductDto): Promise<import("./models/products").ProductDocumenet>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
