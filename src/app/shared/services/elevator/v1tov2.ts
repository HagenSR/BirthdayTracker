import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { VersionService } from '../version/version.service';
import { Version } from '../../enums/version.enum';
import { setCalendarEvents } from '../../../store/calendar-event/calendar-event.actions';
import { selectAllCalendarEvents } from '../../../store/calendar-event/calendar-event.selectors';

@Injectable({
  providedIn: 'root'
})
export class V1toV2 {

  constructor(private readonly store: Store,
    private readonly versionService: VersionService
  ) {
  }

  update() {
    this.store.select(selectAllCalendarEvents).pipe(take(1)).subscribe((events: any[]) => {
      const migrated = events.map((event: any) => {
        const newEvent = { ...event, date: new Date(event.birthDay), eventName: 'Birthday' }
        delete newEvent.birthDay
        return newEvent
      });
      this.store.dispatch(setCalendarEvents({ events: migrated }));
      this.versionService.updateVersion(Version.two);
    });
  }

}
