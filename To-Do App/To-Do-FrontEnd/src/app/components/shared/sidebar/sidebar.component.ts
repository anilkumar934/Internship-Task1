import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { TitleAddTaskComponent } from '../title-add-task/title-add-task.component';




@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule,AddTaskComponent,NgStyle,TitleAddTaskComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {

  constructor(){}

  

  SideBarOptions:{ option: string, routeLink: string }[] = [
    {
      option:'Dashboard',
      routeLink:"/dashboard"
    },
    {
      option:'Active',
      routeLink:"/active" 
    },
    {
      option:'Completed',
      routeLink:"/completed" 
    }
  ]

}
