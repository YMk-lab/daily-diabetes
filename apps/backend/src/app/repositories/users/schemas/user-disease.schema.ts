import { Document } from 'mongoose';
import { Prop, raw } from '@nestjs/mongoose';

export class UserDisease extends Document {

  @Prop()
  diabetesType: string;

  @Prop(raw({
    time: { type: String },
    timeUnit: { type: String }
  }))
  illPeriod: Record<string, any>;

  @Prop()
  shortInsulin: string;

  @Prop()
  baseInsulin: string;

}
