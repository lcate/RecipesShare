import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';
import { User } from '../Models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  user: User = new User();

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    // this.isUserAuthenticated = this.user !== undefined;
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem(Constants.USER_KEY);
      if (userInfo) {
        this.user = JSON.parse(userInfo).user;
        this.authService.sendAuthStateChangeNotification(true);
      }
    }
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
