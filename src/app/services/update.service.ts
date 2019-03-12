import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateModel } from '../model/update.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//Define headers content type  
const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) {}

  public updateUser(UpdateModel): Observable<UpdateModel> {
    // console.log("Restaurant Id"+restaurants.id);
    const id = 100;
    
     return this.http.put<UpdateModel>(
       "http://127.0.0.1:5000/update", UpdateModel
     );
   }
 
}
