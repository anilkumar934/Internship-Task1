import { Component } from '@angular/core';
import { RouterLink,RouterModule } from '@angular/router';
import { AddEmployeeComponent } from '../../../Components/add-employee/add-employee.component';
import { RoleDetailsComponent } from '../../../Components/role-details/role-details.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink,AddEmployeeComponent,RoleDetailsComponent,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
