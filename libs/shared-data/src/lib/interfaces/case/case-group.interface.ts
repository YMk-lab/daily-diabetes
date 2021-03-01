import { CaseInterface } from './case.interface';

export class CaseGroupInterface {
  userId: string;
  uuid: string;
  title: string;
  lastIndication: number;
  lastIndicationType: string;
  lastShortInsulin: number;
  lastBaseInsulin: number;
  caseList: CaseInterface[];
}
