import {TimetableEvent} from './event.model';
import {TimetableLocation} from './location.model';

export class TimetableSchedule {
  location: TimetableLocation;
  events: Array<TimetableEvent>;

  constructor(location: TimetableLocation, events: Array<TimetableEvent>) {
    this.location = location;
    this.events = events;
  }

  addEvent(event: TimetableEvent): void {
    this.events.push(event);
  }

  removeEvent(id: string): void {
    const index = this.events.findIndex(event => event.id === id);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  }
}
