import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule ,Router} from '@angular/router';
import { CommonDirective } from '../../../directives/common.directive';

@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [RouterModule,CommonDirective,CommonModule],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css'
})
export class NavigateComponent implements OnInit{
  showItems:boolean;
  selecteditem:string;

  constructor( private _router:Router){
    this.showItems = false;
    this.selecteditem = '';
    this.setRouteOption();
  }
  ngOnInit(): void {
    this.setRouteOption()
  }

  SideBarOptions:{ option: string, routeLink: string }[] = [
    {
      option:'dashboard',
      routeLink:"/dashboard"
    },
    {
      option:'active',
      routeLink:"/active" 
    },
    {
      option:'completed',
      routeLink:"/completed" 
    }
  ]

  toggleItems(){
    this.showItems = !this.showItems
  }
  
  setRouteOption(){
    this._router.events.subscribe((data:any)=> {
      this.selecteditem = (data['url'] ?? "" as string).slice(1);
    })
  }
}
