import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    templateUrl: 'user-coming-list.page.html'
})

export class UserComingListPage implements OnInit {

    constructor(
        private firebase: AngularFireDatabase
    ) { }

    sendedRequests: Array<any> = [];
    currentRequest: any = {};

    user_info: any;

    ngOnInit() {
        this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

        this.firebase.database.ref(`users-coming/${this.user_info.id}`).on('value', (result) => {
            if (result.val()) {
                result.forEach((elem) => {
                    const current_value = elem.val();
                    if (!current_value.isCamed) {
                        this.firebase.database.ref(`blood-requests/${current_value.request_key}`).on('value', (result) => {
                            this.currentRequest = result.val();
                        });
                    } else {
                        this.firebase.database.ref(`blood-requests/${current_value.request_key}`).on('value', (result) => {
                            this.sendedRequests.push(result.val());
                        });
                    }
                });
            }
        });
    }

    async getRequestById(requestId: string) {
        let request = await this.firebase.database.ref(`blood-requests/${requestId}`).on('value', (result) => {
            return result.val();
        });

        return request;
    }
}