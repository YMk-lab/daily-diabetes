import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class UserAddress extends Document {

  @Prop()
  country: string;

  @Prop()
  cityOrVillage: string;
  
  @Prop()
  address: string;

  @Prop()
  postalZipCode: string;

}
