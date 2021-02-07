import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import {
  LoginInterface, User, UserAddressInterface,
  UserDiseaseInfoInterface, UserInterface
} from '@daily-diabetes/shared-data';

import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../helpers/api-endpoints.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  patient$: Observable<UserInterface>;

  private patientSubject: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(new User());
  private patient: UserInterface;

  constructor(private http: HttpClient) {
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

  login(credentials: LoginInterface): Observable<any> {
    return this.http.post(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.LOGIN }`,
      credentials
    );
  }

  register(patient: UserInterface): Observable<any> {
    return this.http.post(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.REGISTRATION }`,
      patient
    );
  }
}
