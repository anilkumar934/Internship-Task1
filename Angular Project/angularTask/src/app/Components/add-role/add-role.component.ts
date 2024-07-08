import { Component } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { LocationService } from '../../Services/location.service';
import { EmployeeService } from '../../Services/employee.service';
import { Role } from '../../Models/role';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../Services/role.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  locations:any[]=[];
  departments:any[]=[];
  employeesData:any[] = [];
  loginForm:FormGroup;

  ngOnInit(): void {
    this.initializeFormData();
   }

  constructor(private _departmentService:DepartmentService,private _locationService:LocationService,private _employeeService:EmployeeService,private _roleService:RoleService)
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

  onFormSubmit()
  {
    let newRole:Role={
      roleId:this.loginForm.get('roleId').value,
      roleName:this.loginForm.get('roleName').value,
      departmentId:this.loginForm.get('departmentId').value
    }
    this.loginForm.reset();
    this.createRole(newRole);
  }
    
  createRole(role:Role){
    this._roleService.addRole(role).subscribe();
  }

  initializeFormData(){
    this.loginForm = new FormGroup({
      roleId : new FormControl('',[Validators.required,Validators.minLength(4)]),
      roleName:new FormControl('',[Validators.required]),
      departmentId:new FormControl('',[Validators.required])
    });

    }
  }




