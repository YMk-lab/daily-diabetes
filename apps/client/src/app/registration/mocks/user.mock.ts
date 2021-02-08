import { UserInterface } from '@daily-diabetes/shared-data';

export const READY_MADE_USER: UserInterface = {
  _id: null,
  firstName: 'Yura',
  lastName: 'Moryliak',
  birthDate: new Date(),
  phone: '+380983233630',
  email: 'moryliak.y@gmail.com',
  password: '12345678',
  address: {
    country: 'Ukraine',
    cityOrVillage: 'Lviv',
    address: 'Golosko astreet',
    postalZipCode: '79007'
  },
  diseaseInfo: {
    diabetesType: '1st type of diabetes',
    illPeriod: {
      time: '5',
      timeUnit: 'month'
    },
    shortInsulin: 'Novorapid',
    baseInsulin: 'Tresiba'
  }
};
