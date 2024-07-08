import { Component,OnDestroy,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './Components/user-component/user.component';
import { SideBarComponent } from './Shared/Components/side-bar/side-bar.component';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { RoleDetailsComponent } from './Components/role-details/role-details.component'; 
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserComponent,SideBarComponent,NavBarComponent,AddEmployeeComponent,RoleDetailsComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent{
  
  title = "angular";
  display = true;
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
  