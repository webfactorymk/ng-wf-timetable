import {Component} from '@angular/core';
import {TimetableScope} from '../../projects/ng-wf-timetable/src/lib/models/scope';
import {TimetableSchedule} from '../../projects/ng-wf-timetable/src/lib/models/schedule.model';
import {TimetableLocation} from '../../projects/ng-wf-timetable/src/lib/models/location.model';
import {TimetableEvent} from '../../projects/ng-wf-timetable/src/lib/models/event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-wf-timetable';
  scope: TimetableScope;
  schedules: Array<TimetableSchedule>;

  constructor() {
    this.scope = new TimetableScope(
      new Date(
        new Date().setHours(8, 0, 0)),
      new Date(new Date().setHours(16, 0, 0)), 32);

    this.schedules = [
      new TimetableSchedule(
        new TimetableLocation('0', 'Room 1'),
        [
          new TimetableEvent('01',
            new Date(new Date().setHours(8, 0, 0)),
            new Date(new Date().setHours(8, 30, 0)), 'Event 1', 'Bla bla bla', 'red')
        ]
      ),

      new TimetableSchedule(
        new TimetableLocation('1', 'Room 2'),
        [
          new TimetableEvent('02',
            new Date(new Date().setHours(9, 0, 0)),
            new Date(new Date().setHours(9, 30, 0)), 'Event 2', 'Bla bla bla')
        ]
      )
    ];
    setTimeout(() => {
      this.schedules.push(
        new TimetableSchedule(
          new TimetableLocation('2', 'Room 3'),
          [
            new TimetableEvent('03',
              new Date(new Date().setHours(9, 0, 0)),
              new Date(new Date().setHours(9, 30, 0)), 'Event 3', 'Bla bla bla')
          ]
        )
      );
      this.schedules[0].removeEvent('01');
    }, 3000);
  }

  eventClicked(event: TimetableEvent): void {
    console.log('I was clicked', event);
  }
}
