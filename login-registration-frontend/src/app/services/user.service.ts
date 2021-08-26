import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/login_users';
import { RegisterUser } from '../models/register_user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}
  registerUser(userData: RegisterUser) {
    return this.http.post(environment.localhost + '/users', userData);
  }
  loginuser(userData: LoginUser) {
    return this.http.post<{ token: string; userObject: RegisterUser }>(
      environment.localhost + '/users/login',
      userData
    );
  }
  getHome() {
    let token = this.cookieService.get('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http.get(environment.localhost + '/users/home', {
      headers,
    });
  }
}
