import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

import { UserAddress } from './user-address.schema';
import { UserDisease } from './user-disease.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  id: ObjectId

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: UserAddress })
  address: UserAddress;

  @Prop({ type: UserDisease })
  diseaseInfo: UserDisease;

}

export const UserSchema = SchemaFactory.createForClass(User);
