import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ required: true })
  houseId: string;
  @Prop({ required: true })
  userId: string;
  @Prop({ default: 1 })
  count: number;
  @Prop()
  photo: string;
  @Prop()
  name: string;
  @Prop()
  price: Number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
