import {TimetableScope} from './scope';

const EVENT_DEFAULT_COLOR = '#6495ED';

export class TimetableEvent {
  id: string;
  startTime: Date;
  endTime: Date;
  title: string;
  details: string;
  color: string;

  constructor(id: string, startTime: Date, endTime: Date, title: string, details?: string, color?: string) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.title = title;
    this.details = details;
    this.color = color ? color : EVENT_DEFAULT_COLOR;
  }

  getDurationInHours(): number {
    return (this.endTime.getTime() - this.startTime.getTime()) / 1e3 / 60 / 60;
  }

  public getEventWidth(scope: TimetableScope): string {
    const durationHours = this.getDurationInHours();
    return ((durationHours / scope.getTimetableDurationInHours()) * 100) + '%';
  }

  public getEventOffset(scope: TimetableScope): string {
    const
      scopeStartHour = scope.startHour,
      scopeDurationHours = scope.getTimetableDurationInHours(),
      eventStart = this.startTime,
      eventStartHours = eventStart.getHours() + (eventStart.getMinutes() / 60),
      hoursBeforeEvent = eventStartHours - scopeStartHour;
    return ((hoursBeforeEvent / scopeDurationHours) * 100) + '%';
  }
}
