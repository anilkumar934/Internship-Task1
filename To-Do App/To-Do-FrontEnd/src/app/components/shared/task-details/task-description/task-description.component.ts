import { Component,EventEmitter,Input, Output } from '@angular/core';
import { NgClass,NgStyle} from '@angular/common'
import { Task } from '../../../../models/Task';
import { TaskService } from '../../../../services/task.service';
import { AddTaskComponent } from '../../../add-task/add-task.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-description',
  standalone: true,
  imports: [NgClass,NgStyle,AddTaskComponent],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.css'
})
export class TaskDescriptionComponent {
  @Input() taskInfo:any;
  @Input() active:string;
  editTask:boolean;
  display:boolean;
  agotime: string = "";

  constructor(private _taskService:TaskService,private _toastr:ToastrService)
  {
    this.active=''
    this.editTask = true;
    this.display = true;
  }

  getStyles(){
    return{
      'background-color': this.active == 'Completed' ? '#EDB046' : '#ffffff',
      'display':this.active == 'Dashboard'? 'none' : 'block'
    }
  }
  changeStatus(){
    if(this.taskInfo.status == 'Active')
    {
      this._toastr.success("Task is Completed");
      this.taskInfo.status = 'Completed';
    }
    else{
      this._toastr.info("Task is shifted to Active");
      this.taskInfo.status = 'Active';
    }
    this._taskService.updateTask(this.taskInfo.id,this.taskInfo).subscribe(()=>{this._taskService.callFunction()});
  }

  deleteTask(taskInfo:Task){
    let result = confirm("Are you Sure to delete this task");
    if(!result) return;
    this._taskService.deleteTask(taskInfo.id).subscribe(()=>{
      this._taskService.callFunction();
      this._toastr.info("A Task is Deleted");
    });
  }
  addTask:boolean = false;

  durationOfTask()
  {
    let currentDate = new Date();
    let addedDatetime = new Date(this.taskInfo.addedDate);
    let timeGap = (currentDate.getTime() - addedDatetime.getTime())/1000;
    if(timeGap < 60)
    {
      return `Added ${timeGap} seconds ago`;
    }
    else if(timeGap < 3600)
    {
      return `Added ${Math.floor(timeGap/60)} minutes ago`;
    }
    else if(timeGap < 86400)
    {
      return `Added ${Math.floor(timeGap/3600)} hours ago`;
    }
    else if(timeGap < 31536000)
    {
      return `Added ${Math.floor(timeGap/86400)} days ago`;
    }
    else{
      return `Added ${Math.floor(timeGap/31536000)} years ago`;
    }
  }

}
