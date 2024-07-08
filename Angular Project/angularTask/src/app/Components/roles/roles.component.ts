import { Component } from '@angular/core';
import { Role } from '../../Models/role';
import { RoleService } from '../../Services/role.service';
import { RouterLink } from '@angular/router';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roles:Role[] = [];
  employees:Employee[] = [];
  
  constructor(private _roleServices:RoleService,private _employeeService:EmployeeService)
  {
    this.fetchAllRoles();
  }

  fetchAllRoles()
  {
    this._roleServices.getAllRoles().subscribe((data) =>{
      this.roles = data as Role[]
    })
  }

  fetchEmployeesByRole()
  {
    this._employeeService.getEmployeesByRole('role1').subscribe((data) =>{
      this.employees = data as Employee[]
    })
  }
}

