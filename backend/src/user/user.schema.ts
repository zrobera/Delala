import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';

export type UserDocument = User & Document;
export enum Role {
  ADMIN = 'admin',
  USER = 'visitor',
}

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ default: 'visitor' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
