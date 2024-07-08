import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../Models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get("https://localhost:7271/api/Role/All")
  }

  addRole(role:Role){
    return this.http.post("https://localhost:7271/api/Role/Add",role);
  }
}
