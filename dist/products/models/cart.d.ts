import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Products } from './products';
import { User } from 'src/auth/model/users';
export declare type CartDocumenet = Cart & Document;
export declare class Cart {
    user: User;
    cart: Products;
    amount: number;
}
export declare const CartSchema: mongoose.Schema<Document<Cart, any, any>, mongoose.Model<any, any, any>, undefined, any>;
