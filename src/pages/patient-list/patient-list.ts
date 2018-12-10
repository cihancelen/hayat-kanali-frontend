import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-patient-list',
  templateUrl: 'patient-list.html',
})
export class PatientListPage implements OnInit{

  constructor() { }

  patients:Array<any> = [];

  ngOnInit(){
    this.patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : null;
    
  }

}
