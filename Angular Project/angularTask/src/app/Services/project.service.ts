import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  projects:any[]=[];

  getAllProjects(){
    return this.http.get("https://localhost:7271/api/Project/All")
  }
}
