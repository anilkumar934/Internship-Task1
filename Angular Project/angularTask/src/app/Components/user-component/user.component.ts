import { Component,viewChild } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'user-root',
    standalone: true,
    imports: [NgOptimizedImage],
    template: ``,
    styles:`
    :host {
      color: #a144eb;
    }
  `
  })
  export class UserComponent {
  
  }
    