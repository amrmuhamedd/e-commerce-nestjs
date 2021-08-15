import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/model/users';
export declare type ProductDocumenet = Products & Document;
export declare class Products {
    name: string;
    quantity: number;
    description: string;
    seller: User;
}
export declare const ProductSchema: mongoose.Schema<Document<Products, any, any>, mongoose.Model<any, any, any>, undefined, any>;
