import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BloodService } from '../../services/blood.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';
import { HospitalService } from '../../services/hospital.service';

@IonicPage()
@Component({
  selector: 'page-add-blood-request',
  templateUrl: 'add-blood-request.html',
})
export class AddBloodRequestPage implements OnInit {

  constructor(
    private bloodService: BloodService,
    private notificationService: NotificationService,
    private navCtrl: NavController,
    private hospitalService: HospitalService
  ) { }

  patients: Array<any> = [];
  selectedPatient: any = {};
  p: number;
  unitQuantity: string;
  requestDescription: string;

  ngOnInit() {
    var patients = localStorage.getItem('patients');

    if (patients) {
      this.patients = JSON.parse(patients);
    }
    else {
      var hospitalId = JSON.parse(localStorage.getItem('hospital-info')).id;

      this.hospitalService.getPatientsByHospital(hospitalId).subscribe(data => {
        this.patients = data;
      });
    }

  }

  selectPatient() {
    this.selectedPatient = this.patients.find(x => x.id == this.p);
    console.log(this.selectedPatient);
  }

  addBloodRequest() {
    var data = {
      patient: this.selectedPatient,
      unitQuantity: this.unitQuantity,
      description: this.requestDescription,
      requestData: new Date()
    };

    this.bloodService.addBloodRequest(data).then(() => {
      this.notificationService.notification('Kan talebi başarıyla eklenmiştir.');

      this.navCtrl.setRoot(HomePage);
    });
  }

}
