import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[altenUppercase]',
  host: {
    '[style.text-transform]': '"uppercase"'
  }
})
export class UppercaseDirective {

  constructor(public ref: ElementRef) {
  }


}
