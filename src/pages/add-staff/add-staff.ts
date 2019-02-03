import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HospitalService } from '../../services/hospital.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { patterns } from '../../classes/regex-pattern';

@Component({
  selector: 'page-add-staff',
  templateUrl: 'add-staff.html',
})
export class AddStaffPage implements OnInit {

  constructor(
    private hospitalService: HospitalService,
    private notificationService: NotificationService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { }

  employee: any = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    hospitalId: JSON.parse(localStorage.getItem('hospital-info')).id
  };

  employeeForm: FormGroup;
  isSubmit: boolean = false;

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'surname': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email, Validators.pattern(patterns.emailPattern)]],
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  get f() { return this.employeeForm.controls; }

  addEmployee() {
    this.isSubmit = true;

    if (this.employeeForm.valid) {
      this.hospitalService.addEmployee(this.employee).subscribe(data => {
        this.notificationService.notification('Personel başarıyla eklenmiştir.');

        this.navCtrl.setRoot(HomePage);
      }, err => {
        console.log(err);
      })
    }
  }

}
