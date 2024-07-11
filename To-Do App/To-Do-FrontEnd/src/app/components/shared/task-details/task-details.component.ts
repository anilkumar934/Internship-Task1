import { Component,Input, OnInit } from '@angular/core';
import { NgClass, NgIf,NgStyle } from '@angular/common';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { CommonDirective } from '../../../directives/common.directive';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [NgClass,TaskDescriptionComponent,NgIf,NgStyle,CommonDirective],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})

export class TaskDetailsComponent implements OnInit{
  taskId:number;
  tasks:Task[];
  @Input() type:string;
  @Input() showDetails:boolean;
  countOfActive:number;
  countOfCompleted:number;
  
  constructor(private _taskService:TaskService)
  {
    this.type = '';
    this.tasks = [];
    this.taskId = 0;
    this.showDetails = false;
    this.countOfActive = 0;
    this.countOfCompleted = 0;
  }

  ngOnInit():void{
    this.fetchAllTasks();
    this._taskService.registerFunction(this.fetchAllTasks.bind(this))
  }


  fetchAllTasks()
  {
    this._taskService.getAllTasks(this.type).subscribe((data) =>{
      this.tasks = data
      this.countOfActive = 0;
      this.countOfCompleted = 0;
      for(let task of this.tasks)
      {
        if(task.status == "Active") this.countOfActive += 1;
        else this.countOfCompleted += 1;
      }
      this._taskService.emitData(this.tasks);
    })
  }
}
