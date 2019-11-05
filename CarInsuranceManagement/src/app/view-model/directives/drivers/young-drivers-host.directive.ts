import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[young-drivers-host]',
})
export class YoungDriversHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
