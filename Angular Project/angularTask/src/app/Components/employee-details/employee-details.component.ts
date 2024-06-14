import { Component,OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import {CommonModule} from '@angular/common'
import { Employee } from '../../Models/employee';
import { Filter } from '../../Models/filters';
import { DepartmentService } from '../../Services/department.service';
import { LocationService } from '../../Services/location.service';
import { FormsModule,  NgModel,  ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  locations:any[]=[];
  departments:any[]=[];
  employeesData:Employee[] ;
  tempEmployeeData:Employee[];
  characters: string[]=[];
  filters:Filter;
  isActive:boolean = false;
  
  constructor(private _employeeService:EmployeeService,private _departmentService:DepartmentService,private _locationService:LocationService)
  {
    this.initializeCharacters();
    this.fetchAllEmployee();
    this.fetchDepartments();
    this.fetchLocations();
    this.filters = new Filter();
  }

  fetchAllEmployee()
  {
    this._employeeService.getAllEmployees().subscribe((data)=>{
      this.employeesData = data as Employee[];
    });
  }

  OnChangeLocation(loc : any){
    // console.log(loc)
    let locs:string[] = this.filters.locations
    for(let location of locs)
    {
      if(location == loc.locationName)
      {
        locs = locs.filter(ele => ele != loc.locationName);
        this.filters.locations = locs;
        return;
      }
    }
    locs.push(loc.locationName)
    this.filters.locations = locs
    // console.log(this.filters.locations);
  }

  OnChangeDepartment(dep:any)
  {
    let departments:string[] = this.filters.departments
    for(let department of departments)
    {
      if(department == dep.departmentName)
      {
        departments = departments.filter(ele => ele != dep.departmentName);
        this.filters.departments = departments;
        return;
      }
    }
    departments.push(dep.departmentName)
    this.filters.departments = departments;
  }

  initializeCharacters() {
    for (let character = 65; character <= 90; character++) {
      this.characters.push(String.fromCharCode(character));
    }
  }

  selectEmployeeWithFilters(filters:Filter){
    console.log(filters);
    this._employeeService.getEmployeesByFName(filters).subscribe((data)=>{
      this.employeesData = data as Employee[];
    });
  }

  setAlphabetTo(ch:string)
  {
    this.filters.alphabet = ch.toLowerCase();
    this.selectEmployeeWithFilters(this.filters);
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

  resetCharFilter()
  {
    this.fetchAllEmployee();
    this.filters.alphabet = null;
  }
  resetFilters()
  {
    this.filters.departments = [];
    this.filters.locations = [];
    this.selectEmployeeWithFilters(this.filters);
  }
  toggleClass(){
    this.isActive = !this.isActive;
  }
}
