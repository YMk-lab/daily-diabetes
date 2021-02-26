import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { v4 as uuv4 } from 'uuid';

import { Case } from './case.schema';

export type CaseGroupDocument = CaseGroup & Document;

@Schema()
export class CaseGroup extends Document {

  @Prop()
  userId: string;

  @Prop({ default: uuv4() })
  uuid: string;

  @Prop()
  title: string;

  @Prop({ type: Case })
  caseList: Case[];

}

export const CaseGroupSchema = SchemaFactory.createForClass(CaseGroup);
