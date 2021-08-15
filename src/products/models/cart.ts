import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Products } from './products';
import { User } from 'src/auth/model/users';
export type CartDocumenet = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Products' })
  cart: Products;
  @Prop()
  amount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
