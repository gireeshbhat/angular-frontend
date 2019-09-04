
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[popUpScroll]'
})
export class popUpScrollDirective {
  @Input() popUpScroll: any;
  constructor(private el: ElementRef, private renderer: Renderer2 ) {
  }
  ngAfterViewChecked() {
                         const scrollheight =
                           window.innerHeight -
                           this.el.nativeElement.getBoundingClientRect()
                             .top -
                           50;
                         this.renderer.setStyle(
                           this.el.nativeElement,
                           'max-height',
                           scrollheight + 'px'
                         );
                       }
}
