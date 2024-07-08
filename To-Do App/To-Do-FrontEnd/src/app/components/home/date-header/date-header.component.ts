import { Component, OnInit } from '@angular/core';
import {CommonModule, NgClass, NgStyle} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/Task';
import { TaskDetailsComponent } from '../../shared/task-details/task-details.component';



@Component({
  selector: 'app-date-header',
  standalone: true,
  imports: [NgStyle,CommonModule,TaskDetailsComponent,NgClass],
  templateUrl: './date-header.component.html',
  styleUrl: './date-header.component.css'
})
export class DateHeaderComponent implements OnInit{
  routeOption:string ='';
  curDate :Date;

  constructor(private _routeData:ActivatedRoute,private _taskService:TaskService){
    this.routeOption = '';
    this.curDate = new Date();
  }
  
  ngOnInit(): void {
    this._routeData.data.subscribe((data)=>{
      this.routeOption = data['routeOption'];
    })
  }

  deleteAllTasks(){
    var tasks:Task[] = [];
    this._taskService.getAllTasks(this.routeOption).subscribe((data)=>{
      tasks = data as Task[];
      for(let task of tasks)
      {
        this._taskService.deleteTask(task.id).subscribe({
          next:()=>{
            this._taskService.callFunction();
          }
        });
      }
    })
    this._taskService.callFunction();
  }
}
