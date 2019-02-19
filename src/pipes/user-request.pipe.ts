import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userRequestPipe',
    pure: false
})

export class UserRequestPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }

        var user_info;

        if (localStorage.getItem('user-info'))
            user_info = localStorage.getItem('user-info');

        if (user_info) {

            items.forEach(elem =>{
                return elem.userRequests.filter(x => x.id == user_info.id);
            });
            
        }
    }
}