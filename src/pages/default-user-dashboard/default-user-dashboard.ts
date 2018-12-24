import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { isArray } from 'ionic-angular/util/util';
import { NotificationService } from '../../services/notification.service';
import { FirebaseFunctions } from '@angular/fire';
import * as ff from "firebase-functions";
import * as admin from "firebase-admin";
import { Enviroment } from '../../app/enviroment';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-default-user-dashboard',
  templateUrl: 'default-user-dashboard.html',
})
export class DefaultUserDashboardPage implements OnInit {

  constructor(
    private database: AngularFireDatabase,
    private notificationService: NotificationService,
    private firebase: AngularFireDatabase,
    private localNotifications: LocalNotifications
  ) { }

  requests: Array<any> = [];
  user_info: any = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

  ngOnInit() {
    this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

    // this.database.list('blood-requests/').snapshotChanges().subscribe(data => {
    //   this.requests = [];

    //   data.forEach(elem => {
    //     var el = elem.payload.toJSON();
    //     el['key'] = elem.key;

    //     this.requests.push(el);
    //   })
    // });

    this.firebase.list('blood-requests/').snapshotChanges().subscribe(data => {

      data.forEach(elem => {
        console.log(elem.payload.val());

        if (elem.payload.val()['sendedUsers']) {
          var zz = elem.payload.val();

          var sen = zz['sendedUsers'];

          var arr = Object.keys(sen).map(key => sen[key]);
          var a = arr.findIndex(x => x == 'gecersiz');
          arr.splice(a, 1);

          var aa = arr.some(x => x == this.user_info.id);

          if (!aa) {
            this.notificationService.notification(elem.payload.val()['description']).then(() => {
              this.firebase.list('blood-requests/' + elem.key + '/sendedUsers').push(this.user_info.id);
            })
          }

          // arr.forEach(element => {
          //   console.log(element);

          //   if (element != this.user_info.id) {
          //     this.notificationService.notification(elem.payload.val()['description']).then(() => {
          //       this.firebase.list('blood-requests/' + elem.key + '/sendedUsers').push(this.user_info.id);

          //       // console.log('testtt');
          //     })

          //     // this.localNotifications.schedule({
          //     //   id: 1,
          //     //   text: elem['description'],
          //     //   vibrate: true,
          //     // });

          //     // this.localNotifications.on('click').subscribe(() => {
          //     //   this.firebase.object('blood-requests/' + elem.key + '/sendedUsers').set(this.user_info.id);
          //     // });
          //   }

          // });
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
