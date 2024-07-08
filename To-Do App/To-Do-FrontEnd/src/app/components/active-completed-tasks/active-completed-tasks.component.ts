import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsComponent } from '../shared/task-details/task-details.component';
import { HeaderComponent } from '../home/header/header.component';
import { DateHeaderComponent } from '../home/date-header/date-header.component';
import { TaskDescriptionComponent } from '../shared/task-details/task-description/task-description.component';


@Component({
  selector: 'app-active-completed-tasks',
  standalone: true,
  imports: [HeaderComponent,DateHeaderComponent,TaskDetailsComponent,TaskDescriptionComponent],
  templateUrl: './active-completed-tasks.component.html',
  styleUrl: './active-completed-tasks.component.css'
})
export class ActiveCompletedTasksComponent implements OnInit {
  routeOption:string;

  constructor(private _routeData:ActivatedRoute){
    this.routeOption = ''
  }
  
  ngOnInit(): void {
    this._routeData.data.subscribe((data)=>{
      this.routeOption = data['routeOption'];
    })
  }
}
