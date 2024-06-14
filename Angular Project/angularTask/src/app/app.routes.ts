import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { RoleDetailsComponent } from './Components/role-details/role-details.component';
import { EmployeeDetailsComponent } from './Components/employee-details/employee-details.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';

export const routes: Routes = [
    {
        path: '',
        component:AddEmployeeComponent,
    },
    {
        path:'Add-employee',
        component:AddEmployeeComponent,

    },
    {
        path:'Role',
        component:RoleDetailsComponent,
    },
    {
        path:'Employee-details',
        component:EmployeeDetailsComponent
    },
    {
        path:'Add-role',
        component:AddRoleComponent
    }
    // {
    //     path:'**',//wild card route mathces all routes
    //     component:NotFoundDetailsComponent,
    // }
];
