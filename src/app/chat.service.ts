import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


//Define headers content type  
const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" })
};


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public sendData(message): Observable<any> {
    console.log("Inside Service Method: " + message)
    let headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>("http://127.0.0.1:5000/chatbot", {message: message}, {headers: headers})
  }

  // public getOtp(mobileNumber): Observable<any> {
  //   console.log("inside getOtp sevice : "+ mobileNumber)
  //   return this.http.post("http://127.0.0.1:5000/chatbot", {mobileNumber: mobileNumber})
  // }
  getOtp(mobileNumber) {
    console.log("mobileNumber in getOtp Service  ",mobileNumber)
    return this.http.post<any>('http://127.0.0.1:5000/getOtp', {mobileNumber: mobileNumber});
 }
}
