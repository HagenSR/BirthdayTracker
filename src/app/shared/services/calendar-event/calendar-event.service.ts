import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, combineLatest, map, repeat } from 'rxjs';
import { CalendarEvent } from '../../models/calendar-event.model';
import { TimePeriodDuration } from '../../enums/time-period-duration.enum';
import { monthToDuration } from '../../util/records';
import { RerunObservableService } from '../Rerun/rerun-observable.service';
import { upsertCalendarEvent, removeCalendarEvent, setCalendarEvents, resetCalendarEvents } from '../../../store/calendar-event/calendar-event.actions';
import { selectAllCalendarEvents, selectCalendarEventById } from '../../../store/calendar-event/calendar-event.selectors';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {

  private curId = 0;

  private allEvents$ = this.store.select(selectAllCalendarEvents);

  eventsGroupedByDuration$ = combineLatest([this.allEvents$, this.rerun.retriggerObservable$]).pipe(
    map((array) => array[0]),
    map((events) => {
      return events.reduce((acc, event) => {
        return this.findPlaceForEvent(acc, event)
      }, this.initializeReducer())
    }),
    map((events) => {
      Object.keys(TimePeriodDuration).forEach((period) => {
        events[period as TimePeriodDuration] = events[period as TimePeriodDuration].sort((a, b) => a.date.getDate() - b.date.getDate())
      })
      return events;
    })
  )

  durationsInOrder$ = this.rerun.retriggerObservable$.pipe(
    map(() => {
      const durationsInOrder = [TimePeriodDuration.TODAY, TimePeriodDuration.WEEK, TimePeriodDuration.REMAINDER_OF_MONTH]
      const curMonth = new Date().getMonth() + 1
      for (let i = 0; i < 12; i++) {
        durationsInOrder.push(monthToDuration[(curMonth + i) % 12])
      }
      return durationsInOrder
    }),
    repeat()
  )

  constructor(private readonly store: Store,
    private readonly rerun: RerunObservableService) {
    this.allEvents$.pipe(take(1)).subscribe(events => {
      this.updateCurId(events);
      this.updateSerializedStringsToDates(events);
    });
  }

  addEvent(event: CalendarEvent) {
    let id = event.id
    if (id === -1) {
      id = this.curId;
      this.curId++
    }
    this.store.dispatch(upsertCalendarEvent({ event: { ...event, id } }));
  }

  delete(id: number) {
    this.store.dispatch(removeCalendarEvent({ id }));
  }

  reset() {
    this.store.dispatch(resetCalendarEvents());
  }

  selectEntity(id: number) {
    return this.store.select(selectCalendarEventById(id));
  }

  private updateCurId(events: CalendarEvent[]) {
    const ids = events.map(e => e.id).sort((a, b) => b - a);
    if (ids.length > 0) {
      this.curId = ids[0] + 1;
    }
  }

  private updateSerializedStringsToDates(events: CalendarEvent[]) {
    const deserialized = events.map(e => ({ ...e, date: new Date(e.date) }));
    this.store.dispatch(setCalendarEvents({ events: deserialized }));
  }

  initializeReducer(): Record<TimePeriodDuration, CalendarEvent[]> {
    return Object.keys(TimePeriodDuration).reduce((acc, field) => {
      acc[field as keyof typeof TimePeriodDuration] = []
      return acc;
    }, {} as Record<TimePeriodDuration, CalendarEvent[]>)
  }

  findPlaceForEvent(acc: Record<TimePeriodDuration, CalendarEvent[]>, event: CalendarEvent): Record<TimePeriodDuration, CalendarEvent[]> {
    const today = new Date()
    const weekFromNow = new Date(today.getDate() + 7)
    const eventDate = event.date;
    if (today.getMonth() === eventDate.getMonth() && today.getDate() === eventDate.getDate()) {
      acc[TimePeriodDuration.TODAY].push(event)
    }
    else if (today.getMonth() == eventDate.getMonth() && eventDate.getDate() > today.getDate() && eventDate.getDate() < weekFromNow.getDate()) {
      acc[TimePeriodDuration.WEEK].push(event)
    }
    else if (today.getMonth() == eventDate.getMonth() && eventDate.getDate() > today.getDate()) {
      acc[TimePeriodDuration.REMAINDER_OF_MONTH].push(event)
    }
    else {
      acc[monthToDuration[eventDate.getMonth()]].push(event)
    }
    return acc;
  }
}
