import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DepartmentService } from '../../Services/department.service';
import { LocationService } from '../../Services/location.service';
import { RoleService } from '../../Services/role.service';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/employee';
import { ProjectService } from '../../Services/project.service';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,NgIf],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  locations:any[]=[];
  departments:any[]=[];
  roles:any[]=[];
  loginForm:FormGroup;
  projects:any[]=[];
  employeesData:Employee[]=[];


  ngOnInit(): void {
   this.InitializeFormData(); 
  }

  constructor(private _departemnetService:DepartmentService,private _locationService:LocationService,private _roleService:RoleService,private _employeeService:EmployeeService,private _projectService:ProjectService){
    this.fetchDepartments();
    this.fetchLocations();
    this.fetchRoles();
    this.fetchProject();
    this.fetchAllEmployees();
  }

 
  onFormSubmit()
  {
    let newEmployee:Employee={
      employeeId:this.loginForm.get('employeeId').value,
      firstName:this.loginForm.get('firstName').value,
      lastName:this.loginForm.get('lastName').value,
      dateOfBirth:this.loginForm.get('dateOfBirth').value,
      email:this.loginForm.get('email').value,
      mobileNumber:this.loginForm.get('mobileNumber').value,
      joinDate:this.loginForm.get('joinDate').value,
      location:this.loginForm.get('location').value,
      department:this.loginForm.get('department').value,
      jobTitle:this.loginForm.get('role').value,
      manager:this.loginForm.get('manager').value,
      project:this.loginForm.get('project').value
    }
    
    this.loginForm.reset();
    this.createEmployee(newEmployee);
  }


 
  


  fetchDepartments()
  {
        this._departemnetService.getAllDepartments().subscribe((data) =>{
          this.departments = data as any[];
        });
  } 

  fetchLocations()
  {
    this._locationService.getAllLocations().subscribe((data) =>{
      this.locations = data as any[];
    });
  }

  fetchRoles()
  {
    this._roleService.getAllRoles().subscribe((data) =>{
      this.roles = data as any[];
    });
  }

  createEmployee(employee:Employee)
  {
    this._employeeService.addEmployee(employee).subscribe();
  }

  fetchProject()
  {
    this._projectService.getAllProjects().subscribe((data)=>{
      this.projects = data as any[];
    })
  }

  fetchAllEmployees()
  {
    this._employeeService.getAllEmployees().subscribe((data)=>{
      this.employeesData = data as any[];
    })
  }

  InitializeFormData()
  {
    this.loginForm = new FormGroup({
      employeeId:new FormControl('',
          [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^TZ[0-9]{6}$'),
        ]
      ),
      firstName:new FormControl('',
          [Validators.required,
          Validators.minLength(4)]
      ),
      lastName:new FormControl('',
        [Validators.required,
          Validators.minLength(4)] 
      ),
      dateOfBirth:new FormControl(''),
      email:new FormControl('',
        [Validators.required,
          Validators.email]
      ),
      mobileNumber:new FormControl('',
          [Validators.required,
            Validators.minLength(10),
          Validators.pattern('^[1-9]{1}[0-9]{9}$')]
      ),
      joinDate:new FormControl(),
      location:new FormControl(''),
      department:new FormControl(''),
      role:new FormControl(''),
      manager:new FormControl(''),
      project:new FormControl('')
    });
  }
}
