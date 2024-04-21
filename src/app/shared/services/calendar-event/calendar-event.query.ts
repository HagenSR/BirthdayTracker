import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CalendarEventState } from './calendar-event.state';
import { EventStore } from './calendar-event.store';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventQuery extends QueryEntity<CalendarEventState> {
  constructor(protected override store: EventStore) {
    super(store);
  }
}