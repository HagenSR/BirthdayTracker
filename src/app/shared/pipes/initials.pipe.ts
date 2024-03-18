import { Pipe, PipeTransform } from '@angular/core';
import { Birthday } from '../models/birthday.model';

@Pipe({
    standalone: true,
    name: 'initialsPipe'
})
export class InitialsPipe implements PipeTransform {

    transform(value: Birthday | null): string {
        return `${value?.firstName?.substring(0,1)?.toUpperCase() ?? ''}${value?.lastName?.substring(0,1)?.toUpperCase() ?? ''}`
    }
}