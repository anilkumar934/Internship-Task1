import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  getAllLocations(){
    return this.http.get("https://localhost:7271/api/Location/All")
  }
}
