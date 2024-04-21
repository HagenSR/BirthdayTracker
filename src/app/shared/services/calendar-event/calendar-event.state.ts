import { EntityState } from "@datorama/akita";
import { CalendarEvent } from "../../models/calendar-event.model";

export interface CalendarEventState extends EntityState<CalendarEvent, number> { }