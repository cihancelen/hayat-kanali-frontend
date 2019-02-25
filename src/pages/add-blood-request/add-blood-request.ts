import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BloodService } from '../../services/blood.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';
import { HospitalService } from '../../services/hospital.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-add-blood-request',
  templateUrl: 'add-blood-request.html',
})
export class AddBloodRequestPage implements OnInit {

  constructor(
    private bloodService: BloodService,
    private notificationService: NotificationService,
    private navCtrl: NavController,
    private hospitalService: HospitalService,
    private formBuilder: FormBuilder
  ) { }

  patients: Array<any> = [];
  selectedPatient: any = {};
  p: number;
  unitQuantity: number;
  requestDescription: string;
  hospital: any = JSON.parse(localStorage.getItem('hospital-info'));

  addBloodRequestForm: FormGroup;
  isSubmit: boolean = false;

  ngOnInit() {
    this.addBloodRequestForm = this.formBuilder.group({
      'patient': ['', [Validators.required]],
      'unit': ['', [Validators.required, Validators.min(1)]],
      'desc': ['', [Validators.required]]
    });

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

  get f() { return this.addBloodRequestForm.controls; }

  selectPatient() {
    this.selectedPatient = this.patients.find(x => x.id == this.p);

    this.hospitalService.getRelativeByRelativeId(this.selectedPatient.relativeId).subscribe(result =>{
      this.selectedPatient.relative = result;
    })
  }

  addBloodRequest() {
    this.isSubmit = true;

    if (this.addBloodRequestForm.valid) {
      var data = {
        patient: this.selectedPatient,
        unitQuantity: this.unitQuantity,
        waitingUnit: 0,
        suppliedUnit: 0,
        description: this.requestDescription,
        requestData: new Date(),
        hospital: this.hospital,
        isActive: true,
        sendedUsers: [
          "gecersiz"
        ]
      };

      this.bloodService.addBloodRequest(data).push(data).then(() => {
        this.notificationService.notification('Kan talebi başarıyla eklenmiştir.');

        this.navCtrl.setRoot(HomePage);
      });
    }
  }

}
