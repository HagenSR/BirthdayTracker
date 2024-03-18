import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'howOld'
})
export class HowOldPipe implements PipeTransform {

    transform(value: Date | undefined): string {
        const today = new Date()
        return `turning ${(today.getFullYear() - (value?.getFullYear() ?? 0))}`
    }
}