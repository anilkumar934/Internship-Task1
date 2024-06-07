import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'user-root',
    standalone: true,
    imports: [NgOptimizedImage],
    template: `<ul>
                <li>
                  Static : <img src="../../../Assets/Images/Table/team_svgrepo.com.svg" alt ="Static image"/>
                </li>
                <li>
                  Dynamic : <img [src]="logoUrl" [alt]="logoAlt"/>
                </li>
               </ul> `,
    styles:`
    :host {
      color: #a144eb;
    }
  `
  })
  export class UserComponent {
    logoUrl = "../../../Assets/Images/Table/download.jpg";
    logoAlt = "Dynamic Image"
  }
    