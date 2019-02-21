import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from '../../services/notification.service';
import { BackgroundMode } from "@ionic-native/background-mode";
import { districtAndCities } from '../../classes/district-and-cities';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NavController } from 'ionic-angular';
import { DefaultUserRequestDetailPage } from '../../default-user-request-detail/default-user-request-detail.page';
import { BloodRequestDataService } from '../../services/blood-request-data.service';

@Component({
  selector: 'page-default-user-dashboard',
  templateUrl: 'default-user-dashboard.html',
})
export class DefaultUserDashboardPage implements OnInit {

  constructor(
    private firebase: AngularFireDatabase,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
    private navCtrl: NavController,
    private bloodRequestDataService: BloodRequestDataService
  ) { }

  all_requests: Array<any> = [];
  filtered_requests: Array<any> = [];
  user_info: any = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

  cities: Array<any> = districtAndCities.districtAndCities;

  city: number = this.user_info.cityId;
  district: string = 'Hepsi';

  ngOnInit() {
    this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

    this.backgroundMode.enable();

    this.backgroundMode.wakeUp();
    this.backgroundMode.unlock();
    this.backgroundMode.overrideBackButton();

    this.getRequests();
  }

  getRequests() {
    this.firebase.database.ref('blood-requests').orderByChild('hospital/cityId').equalTo(this.city).on('value', (result) => {

      this.all_requests = [];

      result.forEach(request => {
        var current_value = request.val();
        current_value['key'] = request.key;

        if (current_value.patient.bloodGroup === this.user_info.bloodGroup) {
          if (current_value.userRequests) {
            if (current_value.userRequests[this.user_info.id].isActive === false)
              this.all_requests.push(current_value);

          }
          else
            this.all_requests.push(current_value);
        }

        if (request.val()['sendedUsers']) {

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

            this.firebase.list('blood-requests/' + request.key + '/sendedUsers').push(this.user_info.id);

          }
        }
      });

      this.filtered_requests = this.all_requests;
    });

    this.firebase.database.ref('user-messages/' + this.user_info.id).on('value', (result) => {
      result.forEach(message => {

        var value = message.val();

        if (!value.sended) {
          this.localNotifications.schedule({
            id: (new Date().getDate()),
            title: 'Hayat Kanalı',
            text: 'Kan bağışı yaptığınız için teşekkür ederiz.',
            vibrate: true,
            color: 'd32f2f',
            lockscreen: true
          });

          this.firebase.object('user-messages/' + this.user_info.id + '/' + message.key).update({ sended: true });
        }

      });
    });
  }

  goToDetail(request) {
    this.navCtrl.push(DefaultUserRequestDetailPage, request);
  }

  get findDistricts() {
    return this.cities.find(x => x.plaka == this.city).ilceleri;
  }

  selectionChange() {
    this.getRequests();
  }

  filterDistrict() {
    if (this.district === 'Hepsi') {
      this.filtered_requests = this.all_requests;
      return;
    }

    this.filtered_requests = this.all_requests.filter(x => x.hospital.district == this.district);
  }
}
