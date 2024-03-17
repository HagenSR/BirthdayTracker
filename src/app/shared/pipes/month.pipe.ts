import { Pipe, PipeTransform } from '@angular/core';
import { monthMap } from '../util/records';

@Pipe({
    standalone: true,
    name: 'monthPipe'
})
export class MonthPipe implements PipeTransform {

    transform(value: number): string {
        return monthMap[value]
    }
}