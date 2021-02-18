import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'dd-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {

  patient: UserInterface;
  isOpenEditModalOpen: boolean;

  private subscriptions: Subscription = new Subscription();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    const patientSubscription = this.usersService.getMe()
      .subscribe((patient: UserInterface) => this.patient = patient);
    this.subscriptions.add(patientSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
