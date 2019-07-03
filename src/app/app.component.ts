import {Component, OnInit} from '@angular/core';
import {TimetableScope} from '../../projects/ng-wf-timetable/src/lib/models/scope';
import {TimetableSchedule} from '../../projects/ng-wf-timetable/src/lib/models/schedule.model';
import {TimetableLocation} from '../../projects/ng-wf-timetable/src/lib/models/location.model';
import {TimetableEvent} from '../../projects/ng-wf-timetable/src/lib/models/event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  scope: TimetableScope;
  schedules: Array<TimetableSchedule>;

  locationName: string;
  selectedSchedule: TimetableSchedule;
  eventName: string;


  constructor() {
  }

  ngOnInit(): void {
    /*
    The timetable scope which contain params in the following order:
    1. Timetable start time: Date
    2. Timetable end time: Date
    3. (Optional) Number of pixels that should represent 5 minutes (32px by default): number
    */
    const timetableStartTime = new Date(new Date().setHours(8, 0, 0));
    const timetableEndTime = new Date(new Date().setHours(16, 0, 0));

    this.scope = new TimetableScope(timetableStartTime, timetableEndTime);

    /*
    Each timetable schedule contains:
    1. Timetable location: TimetableLocation;

    - Timetable location contains the following params in order:
    `id: string`, `name: string`
    e.g new TimetableLocation('0', 'Room 1')


    2. Array of Timetable events: Array<TimetableEvent>

    - Timetable event contains the following params in order:
    `id: string`, `startTime: Date`, `endTime: Date`, `title: string`, `(optional) details: string`, `(optional) color: string`
    */

    this.schedules = [
      new TimetableSchedule(
        new TimetableLocation('0', 'A'),
        /* Timetable location contains the following params in order: `id: string`, `name: string`*/
        [
          new TimetableEvent('01',
            new Date(new Date().setHours(8, 0, 0)),
            new Date(new Date().setHours(8, 30, 0)), 'Event 1', 'Staff meeting', '#ff0000')
        ]
      ),

      new TimetableSchedule(
        new TimetableLocation('1', 'B'),
        [
          new TimetableEvent('02',
            new Date(new Date().setHours(9, 0, 0)),
            new Date(new Date().setHours(9, 30, 0)), 'Event 2', 'Student meeting')
        ]
      )

    ];
    this.selectedSchedule = this.schedules[0];

  }

  eventClicked(event: TimetableEvent): void {
    const deleteEvent = window.confirm('Do you want to delete ' + event.title + '?');
    if (deleteEvent) {
      this.schedules.find(schedule => schedule.events.some(_event => _event.id === event.id)).removeEvent(event.id);
    }
  }

  addEvent(schedule: TimetableSchedule, event: TimetableEvent): void {
    console.log('A', event.startTime.getTime(), event.endTime.getTime());
    if (event.startTime.getTime() < this.scope.startTime.getTime() || event.endTime.getTime() > this.scope.endTime.getTime()) {
      window.alert('Selected time interval is out of timetable scope');
    } else {
      schedule.addEvent(event);
      this.eventName = undefined;
    }
  }

  addSchedule(schedule: TimetableSchedule): void {
    this.schedules.push(schedule);
  }

  removeSchedule(schedule: TimetableSchedule): void {
    const deleteEvent = window.confirm('Are you sure you want to delete this schedule?');
    if (deleteEvent) {
      const indexToDelete = this.schedules.findIndex(schedule => schedule.location.id === schedule.location.id);
      if (indexToDelete > -1) {
        this.schedules.splice(indexToDelete, 1);
      }
    }
  }

  submitNewScheduleForm(): void {
    const scheduleId = new Date().getTime().toString();
    const newSchedule = new TimetableSchedule(new TimetableLocation(scheduleId, this.locationName), []);
    this.addSchedule(newSchedule);
    this.locationName = undefined;
  }

  deleteSchedule(): void {
    const index = this.schedules.findIndex(schedule => schedule.location.id === this.selectedSchedule.location.id);
    if (index > -1) {
      this.schedules.splice(index, 1);
    }
    this.selectedSchedule = this.schedules[0];
  }

  submitNewEventForm(eventStartTime: string, eventEndTime: string, color: string): void {
    const eventId = new Date().getTime().toString();
    const startTime = new Date(new Date().setHours(Number(eventStartTime.split(':')[0]), Number(eventStartTime.split(':')[1])));
    const endTime = new Date(new Date().setHours(Number(eventEndTime.split(':')[0]), Number(eventEndTime.split(':')[1])));

    if (startTime.getTime() > endTime.getTime()) {
      window.alert('Time interval is invalid');
      return;
    }

    if (startTime.getHours() === endTime.getHours() && endTime.getMinutes() - startTime.getMinutes() < 5) {
      window.alert('Time interval is too short');
      return;
    }

    const newEvent = new TimetableEvent(eventId, startTime, endTime, this.eventName, null, color);
    this.addEvent(this.selectedSchedule, newEvent);
  }
}
