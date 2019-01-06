import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from '../../services/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from "@ionic-native/background-mode";

@Component({
  selector: 'page-default-user-dashboard',
  templateUrl: 'default-user-dashboard.html',
})
export class DefaultUserDashboardPage implements OnInit {

  constructor(
    private database: AngularFireDatabase,
    private notificationService: NotificationService,
    private firebase: AngularFireDatabase,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode
  ) { }

  requests: Array<any> = [];
  user_info: any = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

  ngOnInit() {
    this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

    this.backgroundMode.enable();

    this.backgroundMode.wakeUp();
    this.backgroundMode.unlock();
    this.backgroundMode.overrideBackButton();

    this.firebase.list('blood-requests/').snapshotChanges().subscribe(data => {
      this.requests = [];

      data.forEach(elem => {

        var current_value = elem.payload.val();
        current_value['key'] = elem.key;

        this.requests.push(current_value);

        if (elem.payload.val()['sendedUsers']) {

          var sended = current_value['sendedUsers'];

          var converted_arr = Object.keys(sended).map(key => sended[key]);
          var splice = converted_arr.findIndex(x => x == 'gecersiz');
          converted_arr.splice(splice, 1);

          var isHaveUser = converted_arr.some(x => x == this.user_info.id);

          if (!isHaveUser) {
            this.localNotifications.schedule({
              id: (new Date().getDate()),
              title: 'Hayat Kanalı - Kan Talebi',
              text: current_value['description'],
              vibrate: true,
              color: 'd32f2f',
              lockscreen: true,
            });

            this.firebase.list('blood-requests/' + elem.key + '/sendedUsers').push(this.user_info.id);

          }
        }
      });

    });

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
