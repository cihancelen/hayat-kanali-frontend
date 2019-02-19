import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BloodRequestDataService {

    constructor(
        private firebase: AngularFireDatabase
    ) {
        this.getBloodRequests();
    }

    private bloodRequestsSource = new BehaviorSubject<Array<any>>([]);
    public bloodRequests = this.bloodRequestsSource.asObservable();

    private user_info: any = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;


    private getBloodRequests(): void {
        this.firebase.database.ref('blood-requests').orderByChild('hospital/cityId').equalTo(this.user_info.cityId)
            .on('value', (result) => {

                const all_requests = [];

                result.forEach((request) => {
                    const current_value = request.val();

                    if (current_value.patient.bloodGroup === this.user_info.bloodGroup)
                        all_requests.push(current_value);
                });

                this.bloodRequestsSource.next(all_requests);

            });
    }

    isUserDonation() {
        this.bloodRequests.subscribe((request) =>{
            request.forEach(elem =>{
                console.log(elem);
            })
        });
    }
}