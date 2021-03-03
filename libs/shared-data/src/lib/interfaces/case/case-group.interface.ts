import { CaseInterface } from './case.interface';

export class CaseGroupInterface {
  userId: string;
  uuid: string;
  title: string;
  createdAt: Date;
  lastIndication: number;
  lastIndicationType: string;
  lastShortInsulin: number;
  lastBaseInsulin: number;
  caseList: CaseInterface[];
}
