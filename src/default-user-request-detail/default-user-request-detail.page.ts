import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ComponentFactoryBoundToModule } from '@angular/core/src/linker/component_factory_resolver';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from '../services/notification.service';

@Component({
    templateUrl: 'default-user-request-detail.page.html'
})

export class DefaultUserRequestDetailPage implements OnInit {

    constructor(
        private navParams: NavParams,
        private firebase: AngularFireDatabase,
        private notificationService: NotificationService
    ) { }

    request: any = {};

    isClick: boolean = false;
    isDisabled: boolean = false;

    user_info: any;

    ngOnInit() {
        this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;
        this.request = this.navParams.data;

        this.firebase.object(`donors/${this.user_info.id}`).valueChanges().subscribe((result) => {
            if (result) {
                console.log(result[this.user_info.id].user_id);

                if (result[this.user_info.id].user_id === this.user_info.id && result[this.user_info.id].requestKey !== this.request.key) {
                    this.isDisabled = true;
                }
                else {
                    this.isClick = true;
                }
            }
        });
    }

    async coming() {
        const obj = {};

        obj[this.user_info.id] = this.user_info;

        this.isClick = true;

        /**
         * Talebe gidecek olan bagıscılar için firebasede yeni bir tabloya user idler pushlanıyor.
         */

        const donor = {};
        donor[this.user_info.id] = {
            user_id: this.user_info.id,
            requestKey: this.request.key
        }

        await this.firebase.database.ref('donors/' + this.user_info.id).set(donor);

        this.user_info.isActive = false;

        await this.firebase.database.ref('blood-requests/' + this.request.key + '/userRequests/' + this.user_info.id).set(this.user_info).then(() => {

            this.firebase.database.ref('blood-requests/' + this.request.key).update({ waitingUnit: this.request.waitingUnit + 1 });

            this.notificationService.notification('Gideceğiniz hastane ' + this.request.hospital.name + ' dir. 2 saat içinde herhangi bir talebe cevap veremezsiniz. ');
        });
    }

    user_requests: Array<any> = [];

    async cancel() {
        this.firebase.object('donors/' + this.user_info.id).remove();

        await this.firebase.object(`blood-requests/${this.request.key}/userRequests/${this.user_info.id}`).remove().then(() => {
            this.isClick = false;

            this.notificationService.notification('Gitme talebiniz iptal edilmiştir.');
        });
    }
}