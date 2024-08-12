import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForRegistrationDto } from '../../Interfaces/User/UserForRegistrationDto';
import { RegistrationResponseDto } from '../../Interfaces/Response/RegistrationResponseDto';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, environment.baseUrl), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
