import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CalendarEventState } from './calendar-event.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'birthday', resettable: true })
export class EventStore extends EntityStore<CalendarEventState> {
  constructor() {
    super({})
  }
}