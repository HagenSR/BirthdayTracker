import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'howOld'
})
export class HowOldPipe implements PipeTransform {

    transform(value: Date | undefined, today: Date, eventName: string): string {
        let addOne = 1;
        if (value!.getMonth() >= today.getMonth() && value!.getDate() >= today.getDate()) {
            addOne = 0;
        }
        const years = (today.getFullYear() - (value?.getFullYear() ?? 0)) + addOne;
        const suffix = this.getSuffix(years)
        return `${years}${suffix} ${eventName}`
    }

    private getSuffix(years: number): string {
        let suffix = 'th'
        const yearString = years.toString()
        if (yearString.endsWith('1')) {
            suffix = 'st'
        } else if (yearString.endsWith('2')) {
            suffix = 'nd'
        } else if (yearString.endsWith('3')) {
            suffix = 'rd'
        }
        return suffix
    }
}