import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './Components/user-component/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserComponent],
  template: `<user-root />`,
  styleUrl:'./app.component.css'
})
export class AppComponent {
  title = "angular";
}
  