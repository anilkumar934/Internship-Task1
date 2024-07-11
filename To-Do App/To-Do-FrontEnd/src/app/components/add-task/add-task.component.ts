import { Component,Input,OnInit,Output } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{
  addTaskForm:FormGroup = new FormGroup({});
  taskName:string;
  taskDescription:string;
  @Input() existTask:any; 
  @Input() isForEdit:boolean;


  constructor(private _taskService:TaskService,private _toastr:ToastrService)
  {
    this.taskName = "";
    this.taskDescription ="";
    this.isForEdit = false;
    this.existTask = {};
  }

  
  @Output() hideAddTask:EventEmitter<boolean> = new EventEmitter();

  ngOnInit()
  {
    this.initializeForm();
  }


  initializeForm()
  {
    this.addTaskForm = new FormGroup({
      taskName:new FormControl('',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern(/^(?! ).*/)
        ]),
        taskDescription:new FormControl('',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
        ]
        )
      });
      this.addTaskForm.setValue({
        taskName:this.existTask.name || "",
        taskDescription:this.existTask.description || ""
      });
  }

  onFormSubmit()
  {
    if(this.addTaskForm.invalid){return;}
    if(this.isForEdit)
    {
      this.existTask.name = this.addTaskForm.get('taskName')?.value;
      this.existTask.description = this.addTaskForm.get('taskDescription')?.value;
      this._taskService.updateTask(this.existTask.id,this.existTask).subscribe({
        next:()=>{
          this._toastr.info("Task updated SuccessFully!");
        },
        error:(err)=>{
          this._toastr.error(err);
        }
      });
    }
    else{
      let newTask:Task = {
        id:0,
        name:this.addTaskForm.get('taskName')?.value,
        description:this.addTaskForm.get('taskDescription')?.value,
        userId:0,
        status:"Active",
        
      } 
      this._taskService.addTask(newTask).subscribe({
        next:()=>{
          this._toastr.success("Task Added SuccessFully!");
          this._taskService.callFunction()
        },
        error:(err)=>{
          this._toastr.error(err);
        }
      });
      this.addTaskForm.reset();
    }
    this.hideAddTask.emit();
  }

  hideAddTaskWindow(){
    if(!this.isForEdit) this.addTaskForm.reset();
    this.hideAddTask.emit();
  }
}
