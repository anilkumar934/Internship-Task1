import { Component,OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import {CommonModule} from '@angular/common'
import { Employee } from '../../Models/employee';


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  employeesData:Employee[] = [];
  tempEmployeeData:Employee[]=[];
  characters: string[] = [];
  
  constructor(private _employeeService:EmployeeService)
  {
    this.initializeCharacters();
    this.fetchAllEmployee();
  }

  fetchAllEmployee()
  {
    this._employeeService.getAllEmployees().subscribe((data)=>{
      this.employeesData = data as Employee[];
    });
  }

  initializeCharacters() {
    for (let character = 65; character <= 90; character++) {
      this.characters.push(String.fromCharCode(character));
    }
  }

  selectEmployeeWithChar(char:string){
    this._employeeService.getEmployeesByFName(char.toLowerCase()).subscribe((data)=>{
      this.employeesData = data as Employee[];
    });
  }
}
