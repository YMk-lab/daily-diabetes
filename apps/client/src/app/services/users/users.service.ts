import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserInterface } from '@daily-diabetes/shared-data';

import { API_ENDPOINTS } from '../../helpers/api-endpoints.helper';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get patient$(): Observable<UserInterface> {
    return this.patientSubject.asObservable();
  }

  private patientSubject: ReplaySubject<UserInterface> = new ReplaySubject<UserInterface>();

  constructor(private http: HttpClient) { }

  getMe(): Observable<UserInterface> {
    return this.http.get<UserInterface>(
      `${ environment.server.host }/${environment.server.prefix}/${ API_ENDPOINTS.USERS.ME }`
    ).pipe(tap((patient: UserInterface) => this.patientSubject.next(patient)));
  }

}
