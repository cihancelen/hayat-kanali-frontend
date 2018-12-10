import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientDetailPage } from '../patient-detail/patient-detail';

@IonicPage()
@Component({
  selector: 'page-patient-list',
  templateUrl: 'patient-list.html',
})
export class PatientListPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  patients: Array<any> = [];

  ngOnInit() {
    this.patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : null;
  }

  goDetailPatient(id) {
    this.navCtrl.push(PatientDetailPage, id);
  }

}
