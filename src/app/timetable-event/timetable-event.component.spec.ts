import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableEventComponent } from './timetable-event.component';

describe('TimetableEventComponent', () => {
  let component: TimetableEventComponent;
  let fixture: ComponentFixture<TimetableEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
