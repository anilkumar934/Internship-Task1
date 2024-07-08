import { Component } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-title-add-task',
  standalone: true,
  imports: [AddTaskComponent,NgStyle],
  templateUrl: './title-add-task.component.html',
  styleUrl: './title-add-task.component.css'
})
export class TitleAddTaskComponent {
  addTask:boolean = false;
}
