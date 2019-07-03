import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgWfTimetableComponent} from './ng-wf-timetable.component';
import {TimetableSchedule} from './models/schedule.model';
import {TimetableScope} from './models/scope';
import {TimetableLocation} from './models/location.model';
import {TimetableEvent} from './models/event.model';
import {TimetableTimelineHeaderDirective} from './directives/timetable-timeline-header.directive';
import {TimetableScrollDirective} from './directives/timetable.scroll.directive';
import {TimetableAsideScrollDirective} from './directives/timetable-aside-scroll.directive';

describe('NgWfTimetableComponent', () => {
  let component: NgWfTimetableComponent;
  let fixture: ComponentFixture<NgWfTimetableComponent>;

  const mockSchedules = [
    new TimetableSchedule(new TimetableLocation('01', 'A'),
      [
        new TimetableEvent('01', new Date(new Date().setHours(9, 0, 0)), new Date(new Date().setHours(9, 30, 0)),
          'Event 1')
      ])
  ];

  const mockScope = new TimetableScope(new Date(new Date().setHours(9, 0, 0)), new Date(new Date().setHours(16, 0, 0)));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgWfTimetableComponent, TimetableTimelineHeaderDirective, TimetableScrollDirective, TimetableAsideScrollDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWfTimetableComponent);
    component = fixture.componentInstance;
    component.scope = mockScope;
    component.schedules = mockSchedules;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Timetable scope and schedules should be defined', () => {
    expect(component.scope).toBeDefined();
    expect(component.schedules).toBeDefined();
  });

  it('Timetable should contain exactly one schedule', () => {
    expect(component.schedules.length).toBe(1);
  });

  it('Timetable should contain exactly one event', () => {
    let totalNoOfEvents = 0;
    component.schedules.forEach(schedule => totalNoOfEvents += schedule.events.length);
    expect(totalNoOfEvents).toBe(1);
  });

  it('Timetable should emit when event is clicked', () => {
    spyOn(component.eventClick, 'emit');
    expect(component.eventClick.emit).not.toHaveBeenCalled();
    const mockEvent = component.schedules[0].events[0];
    component.eventClicked(mockEvent);
    fixture.detectChanges();
    expect(component.eventClick.emit).toHaveBeenCalledTimes(1);
    expect(component.eventClick.emit).toHaveBeenCalledWith(mockEvent);
  });
});
