import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TimetableEventComponent} from './timetable-event/timetable-event.component';
import {NgWfTimetableModule} from '../../projects/ng-wf-timetable/src/lib/ng-wf-timetable.module';

@NgModule({
  declarations: [
    AppComponent,
    TimetableEventComponent
  ],
  imports: [
    BrowserModule,
    NgWfTimetableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
