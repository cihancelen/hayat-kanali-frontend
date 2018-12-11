import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { isArray } from 'ionic-angular/util/util';
import { NotificationService } from '../../services/notification.service';

@IonicPage()
@Component({
  selector: 'page-default-user-dashboard',
  templateUrl: 'default-user-dashboard.html',
})
export class DefaultUserDashboardPage implements OnInit {

  constructor(
    private database: AngularFireDatabase,
    private notificationService: NotificationService
  ) { }

  requests: Array<any> = [];
  user_info: any = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

  ngOnInit() {
    this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

    this.database.list('blood-requests/').snapshotChanges().subscribe(data => {
      this.requests = [];

      data.forEach(elem => {
        var el = elem.payload.toJSON();
        el['key'] = elem.key;

        this.requests.push(el);
      })

    })
  }

  goToRequest(item) { }

  coming(patient) {
    this.user_info.isCome = false;
    
    this.database.list('blood-requests/' + patient.key + '/userRequests/')
      .push(this.user_info).then(() => {

        this.database.list('blood-requests/' + patient.key + '/userRequests').valueChanges().subscribe(data => {

          this.database.object('blood-requests/' + patient.key).update({ waitingUnit: data.length });
        });

        this.notificationService.notification('Gideceginiz hastane ' + patient.hospital.name + ' dir.');
      });
  }
}
