import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'removeUnderscores'
})
export class RemoveUnderscores implements PipeTransform {

    transform(value: string): string {
        return value.split('_').join(' ')
    }
}