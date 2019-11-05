import {Directive, ElementRef, AfterViewInit, HostListener} from '@angular/core';

@Directive({
  selector: '[trigger-input-on-focus]'
})
export class TriggerInputDirective implements AfterViewInit {
  constructor(private el: ElementRef)
  {
  }

  @HostListener('focus', ['$event.target'])
  onFocus(target: any){
    console.log('focus', target);

    const input = this.el.nativeElement;
    input.value = input.value == '' ? ' ' : '';
    const evt = document.createEvent('MouseEvent');
    evt.initEvent('input', true, true);
    input.dispatchEvent(evt);
  }
  ngAfterViewInit()
  {

  }
}
