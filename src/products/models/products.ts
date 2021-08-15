import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/model/users';
export type ProductDocumenet = Products & Document;

@Schema()
export class Products {
  @Prop()
  name: string;
  @Prop()
  quantity: number;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: User;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
