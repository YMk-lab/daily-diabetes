import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CaseGroupInterface, CaseInterface } from '@daily-diabetes/shared-data';

import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../helpers/api-endpoints.helper';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  create(newCase: CaseInterface): Observable<any> {
    return this.http.post<CaseInterface>(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.CASES.CREATE }`,
      { newCase: newCase }
    );
  }

  getAll(userId: string): Observable<CaseGroupInterface[]> {
    return this.http.post<CaseGroupInterface[]>(
      `${ environment.server.host }/${ environment.server.prefix }/${ API_ENDPOINTS.CASES.FIND_ALL }`,
      { userId: userId }
    );
  }

}
