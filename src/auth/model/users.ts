import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type UsersDocumenet = User & Document;
import { Products } from 'src/products/models/products';

@Schema()
export class User {
  @Prop({ required: true, unique: true, sparse: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  roles: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] })
  products: Products[];
  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
