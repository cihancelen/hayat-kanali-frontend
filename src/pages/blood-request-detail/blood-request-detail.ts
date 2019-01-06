import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { OpenDataService } from '../../services/open.data.service';
import { HospitalService } from '../../services/hospital.service';

@IonicPage()
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

  came(item) {
    this.firebase.object('blood-requests/' + this.navParams.data).update({ suppliedUnit: this.bloodRequest.suppliedUnit + 1, waitingUnit: this.bloodRequest.waitingUnit - 1 });

    this.firebase.object('blood-requests/' + this.navParams.data).valueChanges().subscribe((data: any) => {

      if (parseInt(data.unitQuantity) == data.suppliedUnit) {
        data.isActive = false;

        this.firebase.object('blood-requests/' + this.navParams.data).update({ isActive: false });
      }

    })

  }

}
