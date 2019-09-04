import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective {
  @Input() appHightlight: any;

  constructor(private el: ElementRef) {}

  ngAfterViewChecked() {
    const x = document.getElementById(this.appHightlight);
    const innerWidth = this.el.nativeElement.getBoundingClientRect().width;
    const innerheight = this.el.nativeElement.getBoundingClientRect().height;

    x.style.height = innerheight + 'px';
  }
}
