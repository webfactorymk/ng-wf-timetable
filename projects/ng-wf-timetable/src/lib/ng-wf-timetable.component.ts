import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {TimetableScope} from './models/scope';
import {TimetableSchedule} from './models/schedule.model';
import {TimetableEvent} from './models/event.model';

@Component({
  selector: 'ng-wf-timetable',
  templateUrl: './ng-wf-timetable.component.html',
  styleUrls: ['./ng-wf-timetable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgWfTimetableComponent implements OnInit {
  @ViewChild('timeHead') timeHead: ElementRef;
  @Input() schedules: Array<TimetableSchedule>;
  @Input() scope: TimetableScope;
  @Output() eventClick: EventEmitter<TimetableEvent> = new EventEmitter<TimetableEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

  eventClicked(event: TimetableEvent): void {
    this.eventClick.emit(event);
  }

}
