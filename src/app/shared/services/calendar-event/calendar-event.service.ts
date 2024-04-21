import { Injectable } from '@angular/core';
import { EventStore } from './calendar-event.store';
import { CalendarEventQuery } from './calendar-event.query';
import { CalendarEvent } from '../../models/calendar-event.model';
import { combineLatest, map, repeat } from 'rxjs';
import { TimePeriodDuration } from '../../enums/time-period-duration.enum';
import { monthToDuration } from '../../util/records';
import { RerunObservableService } from '../Rerun/rerun-observable.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {

  private curId = 0;

  eventsGroupedByDuration$ = combineLatest([this.query.selectAll(), this.rerun.retriggerObservable$]).pipe(
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

  constructor(private readonly store: EventStore,
    public readonly query: CalendarEventQuery,
    private readonly rerun: RerunObservableService) {
    this.updateCurId()
    this.updateSerializedStringsToDates()
  }

  addEvent(event: CalendarEvent) {
    let id = event.id
    if (id === -1) {
      id = this.curId;
      this.curId++
    }
    const newEvent = { ...event, id: id }
    this.store.upsert(newEvent.id, newEvent)
  }

  delete(id: number) {
    this.store.remove(id)
  }

  reset() {
    this.store.reset()
  }

  updateCurId() {
    const ids = this.query.getAll().sort((a, b) => b.id - a.id).map((event) => event.id);
    if (ids.length > 0) {
      this.curId = ids[0] + 1
    }
  }

  updateSerializedStringsToDates() {
    const events = this.query.getAll().map((events) => {
      return { ...events, date: new Date(events.date) }
    })
    this.store.set(events)
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

