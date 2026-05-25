import { createAction, props } from '@ngrx/store';
import { CalendarEvent } from '../../shared/models/calendar-event.model';

export const upsertCalendarEvent = createAction(
  '[Calendar Event] Upsert',
  props<{ event: CalendarEvent }>()
);

export const removeCalendarEvent = createAction(
  '[Calendar Event] Remove',
  props<{ id: number }>()
);

export const setCalendarEvents = createAction(
  '[Calendar Event] Set All',
  props<{ events: CalendarEvent[] }>()
);

export const resetCalendarEvents = createAction('[Calendar Event] Reset');
