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
      'http://127.0.0.1:5000/login',
      LoginModel
    );
  }
}
