import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from '../models/calendar-event.model';

@Pipe({
    standalone: true,
    name: 'initialsPipe'
})
export class InitialsPipe implements PipeTransform {

    transform(value: CalendarEvent | null): string {
        return `${value?.firstName?.substring(0,1)?.toUpperCase() ?? ''}${value?.lastName?.substring(0,1)?.toUpperCase() ?? ''}`
    }
}