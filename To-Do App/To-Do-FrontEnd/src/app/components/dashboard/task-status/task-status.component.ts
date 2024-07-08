import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.css'
})
export class TaskStatusComponent implements OnInit{

  activeTasks:number = 0;
  completedTasks:number = 0;
  getSubTasks: any[] = [];


  constructor(private _taskService:TaskService){}
  
  ngOnInit()
  {
    this._taskService.dataChanged.subscribe((data)=>{
      this.activeTasks = 0
      this.completedTasks = 0
      this.getSubTasks = data as Task[];
      if(this.getSubTasks.length == 0){return;}
      for(var task of this.getSubTasks)
      {
        if(task.status === "Active") this.activeTasks +=1;
        else this.completedTasks +=1;
      }
      this.activeTasks = Math.round((this.activeTasks/this.getSubTasks.length)*100);
      this.completedTasks = Math.round((this.completedTasks/this.getSubTasks.length)*100);
    })
  }
}
