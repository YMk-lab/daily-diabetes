import { CaseInterface } from './case.interface';

export class CaseGroupInterface {
  userId: string;
  uuid: string;
  title: Date;
  caseList: CaseInterface[];
}
