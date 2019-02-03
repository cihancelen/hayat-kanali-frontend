import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HospitalService } from '../../services/hospital.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-add-clinic',
  templateUrl: 'add-clinic.html',
})
export class AddClinicPage implements OnInit {

  constructor(
    private hospitalService: HospitalService,
    private notificationService: NotificationService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { }

  clinic: any = {
    name: '',
    description: ''
  }

  clinicForm: FormGroup;
  isSubmit: boolean = false;

  ngOnInit() {
    this.clinicForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'desc': ['', [Validators.required]]
    });
  }

  get f() { return this.clinicForm.controls; }

  addClinic() {
    this.isSubmit = true;

    if (this.clinicForm.valid) {
      this.hospitalService.addClinic(this.clinic).subscribe(data => {
        this.notificationService.notification('Klinik başarıyla eklenmiştir.');

        this.navCtrl.setRoot(HomePage);
      }, err => {
        console.log(err);
      });
    }
  }

}
