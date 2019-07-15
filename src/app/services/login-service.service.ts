import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }
  login(LoginModel) {
    return this.http.post<LoginModel>(
      'http://10.6.184.194:5000/login',
      LoginModel
    );
  }
}
