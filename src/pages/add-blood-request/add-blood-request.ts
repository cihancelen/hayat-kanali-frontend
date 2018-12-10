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
  hospital: any = JSON.parse(localStorage.getItem('hospital-info'));

  ngOnInit() {
    var patients = localStorage.getItem('patients');

    if (patients) {
      this.patients = JSON.parse(patients);
    }
    else {
      var hospitalId = this.hospital.id;

      this.hospitalService.getPatientsByHospital(hospitalId).subscribe(data => {
        this.patients = data;
      });
    }

  }

  selectPatient() {
    this.selectedPatient = this.patients.find(x => x.id == this.p);
  }

  addBloodRequest() {
    var data = {
      patient: this.selectedPatient,
      unitQuantity: this.unitQuantity,
      description: this.requestDescription,
      requestData: new Date(),
      hospital: this.hospital
    };

    this.bloodService.addBloodRequest(data).push(data).then(() => {
      this.notificationService.notification('Kan talebi başarıyla eklenmiştir.');

      this.navCtrl.setRoot(HomePage);
    });
  }

}
