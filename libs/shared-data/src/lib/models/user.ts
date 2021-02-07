import { UserInterface } from '../interfaces/user/user.interface';

export class User implements UserInterface {
  id: null;
  firstName: '';
  lastName: '';
  birthDate: null;
  phone: '';
  email: '';
  address: {
    country: '',
    cityOrVillage: '';
    address: '',
    postalZipCode: ''
  }
  diseaseInfo: {
    diabetesType: '',
    illPeriod: {
      time: '',
      timeUnit: '',
    }
    shortInsulin: '',
    baseInsulin: ''
  }
}
