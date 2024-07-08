import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Models/employee';
import { Filter } from '../Models/filters';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployees() {
    return this.http.get("https://localhost:7271/api/Employee/All")
  }


  addEmployee(employee:Employee){
    return this.http.post("https://localhost:7271/api/Employee/Add",employee);
  }

  getEmployeesByFName(filters:Filter)
  {
    return this.http.post("https://localhost:7271/api/Employee/filters/",{...filters});
  }

  getEmployeesByRole(role:string)
  {
    return this.http.post("https://localhost:7271/api/Employee/Role/",role);
  }
}
