import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OpenDataService } from '../../services/open.data.service';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'page-patient-detail',
  templateUrl: 'patient-detail.html',
})
export class PatientDetailPage implements OnInit {

  constructor(
    private navParams: NavParams,
    private openDataService: OpenDataService,
    private hospitalService: HospitalService
  ) { }

  patient: any = {};
  bloodGroups:Array<any> = [];
  doctors:Array<any> = [];
  
  ngOnInit() {
    var patients = JSON.parse(localStorage.getItem('patients'));

    this.patient = patients.filter(element => {
      return element.id == this.navParams.data
    })[0];

    this.openDataService.getBloodGroups().subscribe(data =>{
      this.bloodGroups = data;
    });

    var hospitalId = localStorage.getItem('hospital-info') ? JSON.parse(localStorage.getItem('hospital-info')).id : null;
    
    this.hospitalService.getDoctorByHospital(hospitalId).subscribe(data =>{
      this.doctors = data;
    })
  }

}
