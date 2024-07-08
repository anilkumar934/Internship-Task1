import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavigateComponent } from './navigate/navigate.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,HeaderComponent,NavigateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
