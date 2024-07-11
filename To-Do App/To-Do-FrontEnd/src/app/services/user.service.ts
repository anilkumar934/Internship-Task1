
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  validateUser(user:User)
  {
    return  this.http.post("https://localhost:7191/api/User/Login",user);
  }


  addUser(user:User)
  {
    return this.http.post("https://localhost:7191/api/User/Add",user)
  }

  isAuthenticated(){
    return this.http.get("https://localhost:7191/api/User/isauthorized");
  }

  
}
