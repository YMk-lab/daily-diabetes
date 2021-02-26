import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../../../services/users/users.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'dd-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  patient$: Observable<UserInterface>;

  constructor(
    private usersService: UsersService,
    private translateService: TranslateService,
    private lsService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.patient$ = this.usersService.getMe();
    this.translateService.use(this.lsService.get('client-lang'));
  }

}
