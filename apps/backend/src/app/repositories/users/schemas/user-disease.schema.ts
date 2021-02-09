import { Prop, raw } from '@nestjs/mongoose';

export class UserDisease {

  @Prop({ required: true })@Prop()
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
