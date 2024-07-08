import { Component,ElementRef,OnInit, viewChild } from '@angular/core';
import { RouterLink} from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import {CommonModule} from '@angular/common'
import { Employee } from '../../Models/employee';
import { Filter } from '../../Models/filters';
import { DepartmentService } from '../../Services/department.service';
import { LocationService } from '../../Services/location.service';
import { FormsModule } from '@angular/forms';
import * as xlsx from 'xlsx';
import { ViewChild } from '@angular/core';



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
  isLocation:boolean = false;
  isDepartment:boolean = false;
  ellipseStatus = false;
  @ViewChild('employeeInformation') employeeInformation:ElementRef;
  
  constructor(private _employeeService:EmployeeService,private _departmentService:DepartmentService,private _locationService:LocationService)
  {
    this.initializeCharacters();
    this.fetchAllEmployee();
    this.fetchDepartments();
    this.fetchLocations();
    this.filters = new Filter();
  }

  toggleActive()
  {
    this.isActive = !this.isActive;
  }

  toggleDepartment()
  {
    this.isDepartment = !this.isDepartment;
  }

  toggleLocation()
  {
    this.isLocation = !this.isLocation;
  }

  fetchAllEmployee()
  {
    this._employeeService.getAllEmployees().subscribe((data)=>{
      this.employeesData = data as Employee[];
    });
  }

  exportDataToExcel() {
    let data = this.employeeInformation.nativeElement as HTMLElement;
    let clonedTable = data.cloneNode(true) as HTMLElement;
    
    let rows = clonedTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        if (cells.length > 1) {
            rows[i].deleteCell(0);
            rows[i].deleteCell(cells.length - 1);
        }
    }
    
    let excelFile = xlsx.utils.table_to_book(clonedTable, { sheet: 'sheet1' });
    xlsx.writeFile(excelFile, 'ExcelFile.xlsx');
  }

  onClickOfEllipse(status:boolean)
  {
    console.log(status)
  }

  OnChangeLocation(loc : any){
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
  
}
