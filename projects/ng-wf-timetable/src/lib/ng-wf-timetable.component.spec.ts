import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWfTimetableComponent } from './ng-wf-timetable.component';

describe('NgWfTimetableComponent', () => {
  let component: NgWfTimetableComponent;
  let fixture: ComponentFixture<NgWfTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgWfTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWfTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
