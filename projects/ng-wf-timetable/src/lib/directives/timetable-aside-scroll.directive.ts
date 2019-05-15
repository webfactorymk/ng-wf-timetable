import {Directive, ElementRef, HostListener, Input, ViewChild} from '@angular/core';

@Directive({
  selector: '[timetableAsideScroll]'
})
export class TimetableAsideScrollDirective {
  @Input() asideColumn: HTMLElement;

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: MouseEvent) {
    this.asideColumn.scrollTop = this._elementRef.nativeElement.scrollTop;
  }
}
