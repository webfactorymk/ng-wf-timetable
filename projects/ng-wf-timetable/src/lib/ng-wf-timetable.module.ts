import {NgModule} from '@angular/core';
import {NgWfTimetableComponent} from './ng-wf-timetable.component';
import {TimetableScrollDirective} from './directives/timetable.scroll.directive';
import {TimetableAsideScrollDirective} from './directives/timetable-aside-scroll.directive';
import {TimetableTimelineHeaderDirective} from './directives/timetable-timeline-header.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    NgWfTimetableComponent,
    TimetableScrollDirective,
    TimetableAsideScrollDirective,
    TimetableTimelineHeaderDirective
  ],
  imports: [CommonModule],
  exports: [NgWfTimetableComponent]
})
export class NgWfTimetableModule {
}
