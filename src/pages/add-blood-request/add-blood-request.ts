import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BloodService } from '../../services/blood.service';

@IonicPage()
@Component({
  selector: 'page-add-blood-request',
  templateUrl: 'add-blood-request.html',
})
export class AddBloodRequestPage implements OnInit {

  constructor(
    private bloodService: BloodService
  ) { }

  patients: Array<any> = [];
  selectedPatient: any = {};
  p:number;
  unitQuantity: string;
  requestDescription: string;

  ngOnInit() {
    this.bloodService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  selectPatient(){
    this.selectedPatient = this.patients.find(x => x.id == this.p);
    console.log(this.selectedPatient);
  }

  addBloodRequest(){
    var data = {
      patient: this.selectedPatient,
      unitQuantity: this.unitQuantity,
      description: this.requestDescription
    };

    this.bloodService.addBloodRequest(data).then(data =>{
      console.log(data);
    });
  }

}
