import { UserAddressInterface } from './user-address.interface';
import { UserDiseaseInfoInterface } from './user-disease-info.interface';

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  address: UserAddressInterface;
  diseaseInfo: UserDiseaseInfoInterface;
}
