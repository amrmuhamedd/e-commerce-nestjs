import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type UsersDocumenet = User & Document;
import { Products } from 'src/products/models/products';
export declare class User {
    username: string;
    password: string;
    roles: string;
    products: Products[];
    email: string;
}
export declare const UserSchema: mongoose.Schema<Document<User, any, any>, mongoose.Model<any, any, any>, undefined, any>;
