import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarEventState, adapter } from './calendar-event.reducer';

export const selectCalendarEventFeature = createFeatureSelector<CalendarEventState>('birthday');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllCalendarEvents = createSelector(selectCalendarEventFeature, selectAll);
export const selectCalendarEventEntities = createSelector(selectCalendarEventFeature, selectEntities);
export const selectCalendarEventById = (id: number) =>
  createSelector(selectCalendarEventEntities, entities => entities[id]);
