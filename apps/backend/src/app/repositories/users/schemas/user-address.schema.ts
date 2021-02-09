import { Prop } from '@nestjs/mongoose';

export class UserAddress {

  @Prop()
  country: string;

  @Prop()
  cityOrVillage: string;

  @Prop()
  address: string;

  @Prop()
  postalZipCode: string;

}
