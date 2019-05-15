import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {TimetableScope} from '../models/scope';

@Directive({
    selector: '[timetableTimelineHeader]'
})

export class TimetableTimelineHeaderDirective implements OnChanges {
    @Input() scope: TimetableScope;

    constructor(private _elemRef: ElementRef) {

    }

    ngOnChanges(): void {
        this.appendTimelineHeader();
    }

    appendTimelineHeader(): void {
        this._elemRef.nativeElement.innerHTML = ''; // clean up previous timeline if present

        const
            headerULNode = this._elemRef.nativeElement.appendChild(document.createElement('ul'));

        for (let hour = this.scope.startHour; hour <= this.scope.endHour; hour++) {
            const liNode = headerULNode.appendChild(document.createElement('li'));
            const spanNode = liNode.appendChild(document.createElement('span'));
            spanNode.className = 'time-label';
            spanNode.textContent = this.prettyFormatHour(hour);
            if (hour !== this.scope.endHour) {
                this.addSecondsInterval(liNode);
                liNode.style.width = this.scope.cellWidth * 12 + 'px';
            }
        }
    }

    private addSecondsInterval(liNode): void {
        for (let sec = 5; sec <= 55; sec += 5) {
            const secondsSpanNode = liNode.appendChild(document.createElement('span'));
            secondsSpanNode.className = 'time-seconds-label';
            if (sec === 5) {
              secondsSpanNode.style['margin-left'] = this.scope.cellWidth + 'px';
            } else {
              secondsSpanNode.style['margin-left'] = this.scope.cellWidth - 12 + 'px';
            }
            secondsSpanNode.textContent = sec;
        }
    }

    private prettyFormatHour(hour): string {
        hour = Math.floor(hour);
        const prependString = hour < 10 ? '0' : '';
        return prependString + hour + ':00';
    }
}
