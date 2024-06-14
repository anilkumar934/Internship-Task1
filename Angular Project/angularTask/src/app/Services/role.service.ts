import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get("https://localhost:7271/api/Role/All")
  }
}
