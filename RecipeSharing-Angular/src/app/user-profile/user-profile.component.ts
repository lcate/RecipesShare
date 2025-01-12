import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../Models/User';
import { Constants } from '../Helpers/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] // Changed to 'styleUrls' for consistency
})
export class UserProfileComponent implements OnInit {

  userId!: string;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private service: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    // Check if the user is logged in and retrieve the user ID from local storage
    if (typeof window !== 'undefined' && localStorage.getItem(Constants.USER_KEY) !== null) {
      const userKey = localStorage.getItem(Constants.USER_KEY);
      if (userKey) {
        this.userId = JSON.parse(userKey).user.id;
        this.getUserById(this.userId);
      } else {
        // Redirect to login if no user is logged in
        this.router.navigate(['/login']);
      }
    }
  }

  /**
   * Fetches the user details from the server by user ID.
   * @param userId - The ID of the logged-in user.
   */
  getUserById(userId: string) {
    this.service.getUserById('api/accounts/user/', userId).subscribe({
      next: (user: User) => {
        this.user = user;
        // localStorage.removeItem(Constants.USER_KEY);
        // localStorage.clear();
        // localStorage.setItem(Constants.USER_KEY, JSON.stringify(user));
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      }
    });
  }

  /**
   * Redirects the user to the edit profile page.
   */
  editUserProfile() {
    this.router.navigate(['/edit-profile']);
  }

  /**
   * Constructs the full image path for the user's profile picture.
   * @param serverPath - The relative path returned from the server.
   * @returns The complete URL of the image.
   */
  createImgPath(serverPath: string): string {
    if (serverPath) {
      return `http://localhost:5216/${serverPath}`;
    }
    return 'https://via.placeholder.com/150?text=No+Image'; // Placeholder image
  }
}
