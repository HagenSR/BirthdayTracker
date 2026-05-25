import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CalendarEvent } from '../../shared/models/calendar-event.model';
import { upsertCalendarEvent, removeCalendarEvent, setCalendarEvents, resetCalendarEvents } from './calendar-event.actions';

export type CalendarEventState = EntityState<CalendarEvent>;

export const adapter = createEntityAdapter<CalendarEvent>();

const initialState = adapter.getInitialState();

export const calendarEventReducer = createReducer(
  initialState,
  on(upsertCalendarEvent, (state, { event }) => adapter.upsertOne(event, state)),
  on(removeCalendarEvent, (state, { id }) => adapter.removeOne(id, state)),
  on(setCalendarEvents, (state, { events }) => adapter.setAll(events, state)),
  on(resetCalendarEvents, () => initialState),
);
