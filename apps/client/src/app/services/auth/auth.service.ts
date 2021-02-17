import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

import {
  AuthTokensInterface,
  LoginInterface, User, UserAddressInterface,
  UserDiseaseInfoInterface, UserInterface
} from '@daily-diabetes/shared-data';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../helpers/api-endpoints.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  patient$: Observable<UserInterface>;

  private patientSubject: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(new User());
  private patient: UserInterface;

  constructor(
    private http: HttpClient,
    private lsService: LocalStorageService,
    private router: Router
  ) {
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

  login(credentials: LoginInterface): Observable<AuthTokensInterface> {
    return this.http.post<AuthTokensInterface>(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.AUTH.LOGIN }`,
      credentials
    );
  }

  register(patient: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.REGISTRATION.CREATE }`,
      patient
    );
  }

  refreshToken(): Observable<AuthTokensInterface> {
    return this.http.post<AuthTokensInterface>(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.AUTH.REFRESH_TOKEN }`,
      { refreshTokenID: `${ this.lsService.get('refresh-token-id') }` }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.AUTH.LOGOUT }`,
      { refreshTokenID: this.lsService.get('refresh-token-id') }
    ).pipe(switchMap((_: any) => {

      this.lsService.remove('access-token');
      this.lsService.remove('refresh-token-id');

      return fromPromise(this.router.navigate(['/login']));
    }))
  }
}
