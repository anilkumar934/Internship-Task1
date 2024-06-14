import { Component } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { LocationService } from '../../Services/location.service';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  locations:any[]=[];
  departments:any[]=[];
  employeesData:any[] = [];

  constructor(private _departmentService:DepartmentService,private _locationService:LocationService,private _employeeService:EmployeeService)
  {
    this.fetchDepartments();
    this.fetchLocations();
    this.fetchAllEmployee();
  }

  fetchDepartments()
  {
        this._departmentService.getAllDepartments().subscribe((data) =>{
          this.departments = data as any[];
        });
  } 

  fetchLocations()
  {
    this._locationService.getAllLocations().subscribe((data) =>{
      this.locations = data as any[];
    });
  }

  fetchAllEmployee()
  {
    this._employeeService.getAllEmployees().subscribe((data)=>{
      this.employeesData = data as any[];
    });
  }
}


