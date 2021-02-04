import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, UserInterface } from '@daily-diabetes/shared-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  patient$: Observable<UserInterface>;

  private patientSubject: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(new User());

  constructor() {
    this.patient$ = this.patientSubject.asObservable();
  }

  updatePatientInfo(patient: UserInterface): void {
    this.patientSubject.next({ ...patient });
  }

  updatePatientAddressInfo(patient: UserInterface): void {

  }
}
