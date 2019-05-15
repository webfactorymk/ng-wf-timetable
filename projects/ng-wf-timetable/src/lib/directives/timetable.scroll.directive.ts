import {Directive, OnDestroy, HostListener, ElementRef, Input, Renderer2} from '@angular/core';


@Directive({
  selector: '[timetableScroll]'
})
export class TimetableScrollDirective implements OnDestroy {
  @Input() disabled = false;
  @Input() disableOnClassNames: Array<string> = [];
  @Input() timeline: HTMLElement;
  isPressed = false;
  lastEventPositionX = 0;
  lastEventPositionY = 0;

  mouseLeaveListener: Function;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {
    this.mouseLeaveListener = _renderer.listen(this._elementRef.nativeElement, 'mouseleave', this.onMouseUp.bind(this));
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(mouseEvent: MouseEvent) {
    if (!this.disabled && !this.targetInClassNameBlacklist(mouseEvent.target)) {
      event.preventDefault();
      mouseEvent.stopPropagation();
      this.isPressed = true;
      this.lastEventPositionX = mouseEvent.clientX;
      this.lastEventPositionY = mouseEvent.clientY;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(mouseEvent: MouseEvent) {
    if (this.isPressed && !this.disabled && !this.targetInClassNameBlacklist(mouseEvent.target)) {
      event.preventDefault();
      event.stopPropagation();
      this._elementRef.nativeElement.scrollLeft =
        this._elementRef.nativeElement.scrollLeft - mouseEvent.clientX + this.lastEventPositionX;
      this.lastEventPositionX = mouseEvent.clientX;

      this.timeline.scrollTop =
        this.timeline.scrollTop - mouseEvent.clientY + this.lastEventPositionY;
      this.lastEventPositionY = mouseEvent.clientY;

      return false;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(mouseEvent: MouseEvent) {
    if (!this.disabled && !this.targetInClassNameBlacklist(mouseEvent.target)) {
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();
      this.isPressed = false;
      return false;
    }
  }

  ngOnDestroy(): void {
    this.mouseLeaveListener();
  }

  private targetInClassNameBlacklist(target: any) {
    if (target && target.className) {
      return target.className.split(' ').filter((className: string) => {
        if (this.disableOnClassNames.indexOf(className) != -1) {
          return true;
        }
      }).length;
    }

    return false;
  }
}
