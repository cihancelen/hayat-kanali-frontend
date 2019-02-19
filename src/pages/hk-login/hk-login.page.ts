import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenDataService } from '../../services/open.data.service';
import { HttpService } from '../../services/http.service';
import { UserService } from '../../services/user.service';
import { HospitalService } from '../../services/hospital.service';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultUserDashboardPage } from '../default-user-dashboard/default-user-dashboard';
import { HomePage } from '../home/home';
import { patterns } from '../../classes/regex-pattern';
import { HKSingupPage } from '../hk-signup/hk-signup.page';

const loc = window.location.origin;

@Component({
  templateUrl: 'hk-login.page.html',
  styleUrls: [
    `${loc}/assets/login/vendor/bootstrap/css/bootstrap.min.css`,
    `${loc}/assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css`,
    `${loc}/assets/login/fonts/iconic/css/material-design-iconic-font.css`,
    `${loc}/assets/login/vendor/animate/animate.css`,
    `${loc}/assets/login/vendor/css-hamburgers/hamburgers.min.css`,
    `${loc}/assets/login/vendor/animsition/css/animsition.min.css`,
    `${loc}/assets/login/vendor/select2/select2.min.css`,
    `${loc}/assets/login/vendor/daterangepicker/daterangepicker.css`,
    `${loc}/assets/login/css/util.css`,
    `${loc}/assets/login/css/main.css`,
  ]
})

export class HKLoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private httpService: HttpService,
    private userService: UserService,
    private hospitalService: HospitalService,
    private employeeService: EmployeeService,
    public formBuilder: FormBuilder
  ) { }

  loginForm: FormGroup;
  loginType: string = 'default-user';
  isSubmit: boolean = false;

  ngOnInit() {    
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email, Validators.pattern(patterns.emailPattern)]],
      'password': ['', [Validators.required, Validators.minLength(3)]]
    })

  }

  login() {
    this.isSubmit = true;
    if (this.loginForm.valid) {
      this.httpService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginType).subscribe(data => {
        this.httpService.changeHeader(data.access_token);

        if (this.loginType == 'default-user') {
          this.userService.getUserInfo({ email: this.loginForm.value.email }).subscribe(x => {
            localStorage.setItem('user-info', JSON.stringify(x));


            this.navCtrl.setRoot(DefaultUserDashboardPage);
          });
        }
        else if (this.loginType == 'hospital') {
          this.hospitalService.getHospitalInfo({ email: this.loginForm.value.email }).subscribe(x => {
            localStorage.setItem('hospital-info', JSON.stringify(x));

            this.hospitalService.getPatientsByHospital(x.id).subscribe(patients => {
              localStorage.setItem('patients', JSON.stringify(patients));
            });

            this.navCtrl.setRoot(HomePage);
          });
        }
        else if (this.loginType == 'employee') {
          this.employeeService.employeeInfo({ email: this.loginForm.value.email }).subscribe(x => {
            localStorage.setItem('employee-info', JSON.stringify(x));
            this.navCtrl.setRoot(HomePage);
          });
        }
      });
    }
  }

  get lf() { return this.loginForm.controls }

  routeSignUp() {
    this.navCtrl.setRoot(HKSingupPage);
  }

}