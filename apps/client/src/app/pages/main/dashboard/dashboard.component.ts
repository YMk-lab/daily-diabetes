import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'dd-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  patient$: Observable<UserInterface>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.patient$ = this.usersService.getMe();
  }

}
