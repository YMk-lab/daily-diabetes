export class CaseInterface {
  _id?: string;
  uuid?: string;
  userId?: string;
  currentDay: Date;
  currentTime: string;
  shortInsulin: number;
  baseInsulin: number;
  mealType: string;
  mealDescription: string;
  glucometerIndication: number | string;
  glucometerIndicationType: string;
}
