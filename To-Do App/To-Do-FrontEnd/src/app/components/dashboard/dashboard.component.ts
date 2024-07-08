import { Component, OnInit } from '@angular/core';
import { TaskDetailsComponent } from '../shared/task-details/task-details.component';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { NavigateComponent } from '../home/navigate/navigate.component';
import { DateHeaderComponent } from '../home/date-header/date-header.component';
import { Task } from '../../models/Task';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeroComponent,TaskDetailsComponent,TaskStatusComponent,DateHeaderComponent,NavigateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  routeOption:string;
  tasks:Task[];

  constructor(private _routeData:ActivatedRoute){
    this.routeOption = ''
    this.tasks = []
  }
  
  ngOnInit(): void {
    this._routeData.data.subscribe((data)=>{
      this.routeOption = data['routeOption'];
    })
  }

  simple(t:Task[]){
    this.tasks = t;
    console.log(this.tasks)
  }
  
}
