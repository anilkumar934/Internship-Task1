import { Component,OnInit} from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router } from '@angular/router';
import { TitleAddTaskComponent } from '../../shared/title-add-task/title-add-task.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleAddTaskComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  routeOption:string;

  constructor(private _routeData:Router,private _router:Router,private _toastr:ToastrService){
    this.routeOption = ''
    this.setRouteOption();
  }
  
  ngOnInit(): void {
      this.setRouteOption()
  } 

  setRouteOption(){
    this._routeData.events.subscribe((data:any)=> {
      this.routeOption = (data['url'] ?? "" as string).slice(1);
    })
  }

  signOut(){
    this._toastr.info("Logged Out");
    localStorage.removeItem('token');
    this._router.navigate(['signup'])
  }

}
