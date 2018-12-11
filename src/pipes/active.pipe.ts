import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activePipe',
    pure: false
})

export class ActivePipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.isActive && item.isActive == true);
    }
}