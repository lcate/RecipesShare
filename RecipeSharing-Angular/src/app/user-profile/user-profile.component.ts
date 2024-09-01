import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { User } from '../Models/User';
import { Constants } from '../Helpers/constants';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  userId!: string;
  user: User = new User();

  constructor(private route: ActivatedRoute, private service: AuthenticationService, private router: Router)
         { }

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem(Constants.USER_KEY) !== null){
      this.userId = JSON.parse(localStorage.getItem(Constants.USER_KEY)!).user.id;
      this.getUserById(this.userId);
    }
  }

  getUserById(userId: string) {
    this.service.getUserById('api/accounts/user/', userId).subscribe(user => {
      this.user = user;
    });
  }
}
