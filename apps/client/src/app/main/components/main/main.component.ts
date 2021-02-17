import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'dd-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.getMe().subscribe((user) => console.log(user))
  }

  getMe() {
    this.usersService.getMe().subscribe((user) => console.log(user));
  }

  logout() {
    this.authService.logout().subscribe((_) => {
      this.router.navigate(['/login']).then();
    })
  }
}
