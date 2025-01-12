import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Models/User';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Constants } from '../../../Helpers/constants';


@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  editProfileForm!: FormGroup;
  user: User = new User();
  userId!: string;
  loading = false;
  submitted = false;
  imageToShow: string = '';
  image: string = '';

  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  /**
   * Initializes the edit profile form with validation.
   */
  private initializeForm(): void {
    this.editProfileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      about: ['']
    });
  }

  /**
   * Loads user data into the form.
   */
  private loadUserData(): void {
    if (typeof window !== 'undefined' && localStorage.getItem(Constants.USER_KEY) !== null) {
      const userKey = localStorage.getItem(Constants.USER_KEY);
      if (userKey) {
        this.userId = JSON.parse(userKey).user.id;
        this.service.getUserById('api/accounts/user/', this.userId).subscribe({
          next: (user: User) => {
            this.user = user;
            this.image = user.profilePicture;
            this.imageToShow = this.createImgPath(this.user.profilePicture);
            this.editProfileForm.patchValue(this.user);
          },
          error: (err) => {
            console.error('Failed to fetch user details:', err);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  onImageUpload(event: any) {
    this.imageToShow = this.createImgPath(event.dbPath);
    this.image = event.dbPath; // Update the image path with the backend's uploaded file path
  }

  /**
   * Submits the form to save user profile changes.
   */
  onSubmit(): void {
    this.submitted = true;

    this.loading = true;
    const updatedUser = { ...this.user, ...this.editProfileForm.value };
    updatedUser.profilePicture = this.image;

    this.service.updateUserProfile('api/accounts/user/', updatedUser).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/profile']);
      },
      error: (err:any) => {
        console.error('Failed to update profile:', err);
        this.loading = false;
      }
    });
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `http://localhost:5216/` + serverPath;
    } else {
      return 'https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png';
    }
  }
}
