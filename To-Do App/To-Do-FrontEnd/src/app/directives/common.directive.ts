import { Directive,ElementRef,HostListener,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCommon]',
  standalone: true
})
export class CommonDirective {

  @Output() clickOutside = new EventEmitter();
  constructor(private ele:ElementRef) { }

  @HostListener('document:click',['$event.target']) onClick(targetEle:HTMLElement)
  {
    const clickedInside = this.ele.nativeElement.contains(targetEle);
    if(!clickedInside)
    {
      this.clickOutside.emit(null);
    }
  }
}
