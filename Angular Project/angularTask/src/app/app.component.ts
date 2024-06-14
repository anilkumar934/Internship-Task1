import { Component,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './Components/user-component/user.component';
import { SideBarComponent } from './Shared/Components/side-bar/side-bar.component';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { RoleDetailsComponent } from './Components/role-details/role-details.component'; 
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserComponent,SideBarComponent,NavBarComponent,AddEmployeeComponent,RoleDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent {

  items:any[]=[];

  constructor(){
    this.fetchData();
  }
  
  private  http = inject(HttpClient);
  fetchData()
  {
    this.http
        .get('https://localhost:7271/api/Location/All')
        .subscribe((data) =>{
          this.items = data as any[];
        });
  } 

  title = "angular";
}
  