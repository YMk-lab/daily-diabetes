import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

import { v4 as uuv4 } from 'uuid';

export class Case extends Document {

  @Prop()
  userId: string;

  @Prop({ default: uuv4() })
  uuid: string;

  @Prop()
  groupId: string;

  @Prop()
  currentDay: string;

  @Prop()
  currentTime: string;

  @Prop()
  shortInsulin: number;

  @Prop()
  baseInsulin: number;

  @Prop()
  mealType: string;

  @Prop()
  mealDescription: string;

  @Prop()
  glucometerIndication: number;

  @Prop()
  glucometerIndicationType: string;
}
