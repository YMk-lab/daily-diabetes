import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, UserAddressInterface,
  UserDiseaseInfoInterface, UserInterface
} from '@daily-diabetes/shared-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  patient$: Observable<UserInterface>;

  private patientSubject: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(new User());
  private patient: UserInterface;

  constructor() {
    this.patient$ = this.patientSubject.asObservable();
  }

  updatePatientInfo(patient: UserInterface): void {
    this.patient = { ...patient };
    this.patientSubject.next(this.patient);
  }

  updatePatientAddressInfo(address: UserAddressInterface): void {
    this.patient.address = { ...address };
    this.patientSubject.next(this.patient);
  }

  updatePatientDiseaseInfo(disease: UserDiseaseInfoInterface): void {
    this.patient.diseaseInfo = { ...disease };
    this.patientSubject.next(this.patient);
  }
}
