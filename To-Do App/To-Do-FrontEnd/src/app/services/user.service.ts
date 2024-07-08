
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  validateUser(user:User)
  {
    return  this.http.post("https://localhost:7191/api/User/validate",user);
  }


  addUser(user:User)
  {
    return this.http.post("https://localhost:7191/api/User/Add",user)
  }

  isAuthenticated(){
    return this.http.get("https://localhost:7191/api/User/isauthorized");
  }

  
}
