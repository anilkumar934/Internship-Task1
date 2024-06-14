import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';


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

  getEmployeesByFName(alphabet:string)
  {
    return this.http.get("https://localhost:7271/api/Employee/filter/"+alphabet);
  }
}
