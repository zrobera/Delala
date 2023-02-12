import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';

export type HouseDocument = House & Document;
export enum STATUS {
  SALE = 'for sale',
  RENT = 'for rent',
}
export enum PRICE {
  CLASS_A = '<100,000',
  CLASS_B = '100,000-500,000',
  CLASS_C = '500,000-1,000,000',
  CLASS_D = '1,000,000-2,000,000',
}

@Schema()
export class House {
  @Prop({ required: true })
  price: number;
  @Prop()
  description: string;

  @Prop({ default: 1 })
  bed: number;

  @Prop({ default: 1 })
  bathroom: number;

  @Prop({ default: 0 })
  parking: number;

  @Prop({ required: true })
  photos: string[];
  @Prop()
  video: string;
  @Prop()
  relator: string;
  @Prop()
  year_build: number;

  @Prop()
  status: STATUS;

  @Prop()
  price_range: PRICE;

  @Prop()
  propert_type: string;

  @Prop({ default: 0 })
  garage: number;

  @Prop({ required: true })
  area: number;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  map: string;
}

export const HouseSchema = SchemaFactory.createForClass(House);
