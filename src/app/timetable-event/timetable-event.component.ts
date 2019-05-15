import {Component, Input, OnInit} from '@angular/core';
import {TimetableEvent} from '../../../projects/ng-wf-timetable/src/lib/models/event.model';

@Component({
  selector: 'app-timetable-event',
  templateUrl: './timetable-event.component.html',
  styleUrls: ['./timetable-event.component.scss']
})
export class TimetableEventComponent implements OnInit {
  @Input() event: TimetableEvent;

  constructor() {
  }

  ngOnInit() {

  }

}
