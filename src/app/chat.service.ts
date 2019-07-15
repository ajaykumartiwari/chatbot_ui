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
    return this.http.post<any>("http://10.6.184.194:5000/chatbot", {message: message}, {headers: headers})
  }
}
