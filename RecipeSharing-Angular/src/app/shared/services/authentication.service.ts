import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserForRegistrationDto } from '../../Interfaces/User/UserForRegistrationDto';
import { RegistrationResponseDto } from '../../Interfaces/Response/RegistrationResponseDto';
import { environment } from '../../Environments/environment';
import { UserForAuthenticationDto } from '../../Interfaces/User/UserForAuthenticationDto';
import { AuthResponseDto } from '../../Interfaces/Response/AuthResponseDto';
import { Subject } from 'rxjs';
import { Constants } from '../../Helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, environment.baseUrl), body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, environment.baseUrl), body);
  }

  public logout = () => {
    localStorage.removeItem(Constants.USER_KEY);
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
