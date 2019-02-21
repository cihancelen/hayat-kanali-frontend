import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { HKLoginPage } from '../hk-login/hk-login.page';
import { districtAndCities } from '../../classes/district-and-cities';
import { DefaultUserRequestDetailPage } from '../../default-user-request-detail/default-user-request-detail.page';
import { OpenDataService } from '../../services/open.data.service';
import { RequestDetailPage } from '../request-detail/request-detail.page';

@Component({
  selector: 'page-blood-request-list',
  templateUrl: 'blood-request-list.html',
})
export class BloodRequestListPage implements OnInit {

  requests: Array<any> = [];
  isLogin: boolean = false;

  constructor(
    private firebase: AngularFireDatabase,
    private navCtrl: NavController,
    private openDataService: OpenDataService
  ) { }

  all_requests: Array<any> = [];
  filtered_requests: Array<any> = [];

  cities: Array<any> = districtAndCities.districtAndCities;

  city: number = 34;
  district: string = 'Hepsi';
  bloodGroups: Array<any> = [];
  selectedBloodGroup: any = 'Hepsi';

  ngOnInit() {
    this.openDataService.getBloodGroups().toPromise().then((result) => {
      this.bloodGroups = result;
    });
    this.getRequests();
  }

  goToLoginPage() {
    this.navCtrl.setRoot(HKLoginPage);
  }

  getRequests() {
    this.firebase.database.ref('blood-requests').orderByChild('hospital/cityId').equalTo(this.city).on('value', (result) => {

      this.all_requests = [];

      result.forEach(request => {
        var current_value = request.val();
        current_value['key'] = request.key;

        if (current_value.patient.bloodGroup === this.selectedBloodGroup || this.selectedBloodGroup === 'Hepsi') {
          this.all_requests.push(current_value);
        }
      });

      this.filtered_requests = this.all_requests;
    });
  }

  goToDetail(request) {
    this.navCtrl.push(RequestDetailPage, request);
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
