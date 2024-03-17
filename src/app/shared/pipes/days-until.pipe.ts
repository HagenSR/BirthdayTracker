import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'daysUntil'
})
export class DaysUntilPipe implements PipeTransform {

    private oneDay = 24 * 60 * 60 * 1000;

    transform(value: Date): string {
        const today = new Date()
        let year = today.getFullYear()
        if (value.getMonth() < today.getMonth() || (value.getMonth() === today.getMonth() && value.getDate() < today.getDate())) {
            year += 1
        }
        const nextBirthday = new Date(year, value.getMonth(), value.getDate())
        const diffDays = Math.floor(Math.abs((nextBirthday.getTime() - today.getTime()) / this.oneDay));
        return `${(diffDays)}`
    }
}