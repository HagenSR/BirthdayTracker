import { Injectable } from '@angular/core';
import { EventStore } from '../calendar-event/calendar-event.store';
import { CalendarEventService } from '../calendar-event/calendar-event.service';
import { VersionService } from '../version/version.service';
import { Version } from '../../enums/version.enum';

@Injectable({
  providedIn: 'root'
})
export class V1toV2 {

  constructor(private readonly eventStore: EventStore,
    private readonly eventService: CalendarEventService,
    private readonly versionService: VersionService
  ) {
  }

  update() {
    const events = this.eventService.query.getAll().map((event: any) => {
      const newEvent = { ...event, date: new Date(event.birthDay), eventName: 'Birthday' }
      delete newEvent.birthDay
      return newEvent
    })
    this.eventStore.set(events)
    this.versionService.updateVersion(Version.two)
  }

}
