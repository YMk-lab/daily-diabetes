import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { API_ENDPOINTS } from '../../helpers/api-endpoints.helper';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getMe(): Observable<UserInterface> {
    return this.http.get<UserInterface>(
      `${ environment.server.host }/${environment.server.prefix}/${ API_ENDPOINTS.USERS.ME }`
    );
  }

}
