import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { OpenDataService } from '../../services/open.data.service';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'page-blood-request-detail',
  templateUrl: 'blood-request-detail.html',
})
export class BloodRequestDetailPage implements OnInit {

  constructor(
    private navParams: NavParams,
    private firebase: AngularFireDatabase,
    private openDataService: OpenDataService,
    private hospitalService: HospitalService
  ) { }

  bloodRequest: any = {
    patient: {}
  };

  bloodGroups: Array<any> = [];
  doctors: Array<any> = [];

  userRequests: Array<any> = [];

  ngOnInit() {    
    this.firebase.object('blood-requests/' + this.navParams.data).valueChanges().subscribe(data => {
      this.bloodRequest = data;

      if (this.bloodRequest.userRequests) {
        this.userRequests = Object.keys(this.bloodRequest.userRequests).map(i => this.bloodRequest.userRequests[i]);
      }
    })

    this.openDataService.getBloodGroups().subscribe(data => {
      this.bloodGroups = data;
    });

    var hospitalId = localStorage.getItem('hospital-info') ? JSON.parse(localStorage.getItem('hospital-info')).id : null;

    this.hospitalService.getDoctorByHospital(hospitalId).subscribe(data => {
      this.doctors = data;
    })
  }

  async came(item) {
    await this.firebase.object('blood-requests/' + this.navParams.data).update({ suppliedUnit: this.bloodRequest.suppliedUnit + 1, waitingUnit: this.bloodRequest.waitingUnit - 1 });

    await this.firebase.object('blood-requests/' + this.navParams.data + '/userRequests/' + item.id).update({ isActive: true });
    await this.firebase.object('blood-requests/' + this.navParams.data + '/userRequests/' + item.id + '/lastDonataTime').set(new Date());
    await this.firebase.object('blood-requests/' + this.navParams.data).valueChanges().subscribe((data: any) => {

      if (parseInt(data.unitQuantity) == data.suppliedUnit) {
        data.isActive = false;

        this.firebase.object('blood-requests/' + this.navParams.data).update({ isActive: false });
      }

      const obj = {
        user_id: item.id,
        reuqest_id: this.navParams.data,
        sended: false
      };

      this.firebase.database.ref(`user-messages/${item.id}/`).push(obj);
      this.firebase.object(`users-coming/${item.id}/${this.navParams.data}/`).update({ isCamed: true });
    });



  }

}
