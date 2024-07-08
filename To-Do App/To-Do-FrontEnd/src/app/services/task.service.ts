import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private fetchTasks:() => void;
  dataChanged = new EventEmitter();

  constructor(private http:HttpClient) {
    this.fetchTasks = () => {};
   }


  getAllTasks(status:string)
  {
    return this.http.get<Task[]>("https://localhost:7191/api/Task/Status/"+status)
  }

  addTask(task:Task)
  {
    return this.http.post("https://localhost:7191/api/Task/Add",task);
  }

  updateTask(id:number,data:Task)
  {
    return this.http.put("https://localhost:7191/api/Task/"+id,data);
  }

  deleteTask(taskId:number)
  {
    return this.http.delete("https://localhost:7191/api/Task/Delete/"+taskId);
  }

  registerFunction(fun:()=>void)
  {
    this.fetchTasks = fun;
  }

  callFunction()
  {
    if(this.fetchTasks)
    {
      this.fetchTasks();
    }
  }

  emitData(data:Task[]){
    this.dataChanged.emit(data);
  }
}
