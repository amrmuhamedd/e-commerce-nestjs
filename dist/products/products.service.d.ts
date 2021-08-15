import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Products, ProductDocumenet } from './models/products';
import { CartDocumenet } from './models/cart';
import { UsersDocumenet } from '../auth/model/users';
import { CreateProductDto } from './products.Dto/creatproduct.dto';
import { UpdateProductDto } from './products.Dto/upadateProduct.dto';
import { Request } from 'express';
export declare class ProductsService {
    private ProductModel;
    private userModal;
    private cartModal;
    private request;
    private readonly connection;
    constructor(ProductModel: Model<ProductDocumenet>, userModal: Model<UsersDocumenet>, cartModal: Model<CartDocumenet>, request: Request, connection: mongoose.Connection);
    create(createProductDto: CreateProductDto): Promise<Products>;
    getAll(): Promise<Products[]>;
    getProductbyId(id: any): Promise<ProductDocumenet>;
    getProductsByUserId(id: any): Promise<any>;
    updateProduct(id: any, UpdateProductDto: UpdateProductDto): Promise<ProductDocumenet>;
    addToCart(id: any, amount: any): Promise<{
        message: string;
    }>;
    getProductsCart(): Promise<any>;
    deleteProductFromCart(id: any): Promise<string>;
    deleteProduct(id: any): Promise<{
        message: string;
    }>;
}
