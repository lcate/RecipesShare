import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isUserAuthenticated: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  get user(): any {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);
    return user;
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
