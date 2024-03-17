import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'monthPipe'
})
export class MonthPipe implements PipeTransform {

    monthMap: Record<number, string> = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    transform(value: number): string {
        return this.monthMap[value]
    }
}