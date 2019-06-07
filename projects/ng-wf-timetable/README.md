# NG WF Timetable

NgWf timetable is an Angular2+ library for displaying time-based schedules across several locations in a timetable format where each schedule has a location and may contain events.

## Features
1. Fixed location display names on horizontal scroll.
2. Click and drag to scroll on location timeline.
3. Fixed time interval on vertical scroll when component height is set.
4. Dynamically add and remove events and schedules from timetable.

## Preview

![alt text](https://raw.githubusercontent.com/webfactorymk/ng-wf-timetable/master/src/assets/screenshot1.png)
#### [Github](https://github.com/webfactorymk/ng-wf-timetable)
#### [Preview on StackBlitz](https://angular-nteqku.stackblitz.io)


## Installation

Use the package manager [npm](https://www.npmjs.com/package/ng2-wf-timetable) to install ng2-wf-timetable.

```bash
npm i ng2-wf-timetable
```
## HTML Template
``` HTML
<ng-wf-timetable 
[scope]="scope"
[schedules]="schedules" 
(eventClick)="eventClicked($event)">
</ng-wf-timetable>
```
(eventClick) emits the selected TimetableEvent when clicked.

## Usage

1. Import NgWfTimetableModule in your application module or feature module.

2. In your component.ts :
```typescript

import {Component, OnInit} from '@angular/core';
import {TimetableEvent, TimetableLocation, TimetableSchedule, TimetableScope} from 'ng-wf-timetable';

export class AppComponent implements OnInit {
  scope: TimetableScope;
  schedules: Array<TimetableSchedule>;

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
          new TimetableLocation('0', 'Room 1'),
          /* Timetable location contains the following params in order: `id: string`, `name: string`*/
          [
            new TimetableEvent('01',
              new Date(new Date().setHours(8, 0, 0)),
              new Date(new Date().setHours(8, 30, 0)), 'Event 1', 'Staff meeting', '#ff0000')
          ]
        ),
  
        new TimetableSchedule(
          new TimetableLocation('1', 'Room 2'),
          [
            new TimetableEvent('02',
              new Date(new Date().setHours(9, 0, 0)),
              new Date(new Date().setHours(9, 30, 0)), 'Event 2', 'Student meeting')
          ]
        )
      ];
    }
  
    eventClicked(event: TimetableEvent): void {
      window.alert(event.title);
    }
  }
  ```
  ### Dynamic methods
  Add new events to the timetable dynamically by calling `addEvent(newEvent)` method on the targeted schedule.
  ```
  addTimetableEvent(): void {
    const newEvent = new TimetableEvent(/*Enter params*/);
    this.schedules[0].addEvent(newEvent);
  }
  
  ``` 
  Remove events from the timetable dynamically by calling `removeEvent(eventId)` method on the targeted schedule.
  ```
  removeTimetableEvent(): void {
    this.schedules[0].removeEvent(/*eventId: string*/);
  }
  ``` 
  Add schedules to the timetable dynamically by applying Array methods such as `push(newSchedule)` on your predefined schedules Array.
  ```
  addTimetableSchedule(): void {
    const newSchedule = new TimetableSchedule(/*Enter params*/);
    /* Schedules array supports all array operations */
    this.schedules.push(newSchedule);
  }

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
