import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken extends Document {

  @Prop()
  uuid: string;

  @Prop()
  userId: string;

  @Prop()
  refreshToken: string;

  @Prop()
  fingerPrint: string;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
