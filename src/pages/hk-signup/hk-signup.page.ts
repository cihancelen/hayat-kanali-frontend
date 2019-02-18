import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patterns } from '../../classes/regex-pattern';
import { NavController, ModalController } from 'ionic-angular';
import { HKLoginPage } from '../hk-login/hk-login.page';
import { HttpService } from '../../services/http.service';
import { OpenDataService } from '../../services/open.data.service';
import { ParamsModal } from '../params-modal/params.modal';
import { DefaultUserDashboardPage } from '../default-user-dashboard/default-user-dashboard';

@Component({
  templateUrl: 'hk-signup.page.html',
  styleUrls: [
    '../../assets/login/vendor/bootstrap/css/bootstrap.min.css',
    '../../assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../assets/login/fonts/iconic/css/material-design-iconic-font.css',
    '../../assets/login/vendor/animate/animate.css',
    '../../assets/login/vendor/css-hamburgers/hamburgers.min.css',
    '../../assets/login/vendor/animsition/css/animsition.min.css',
    '../../assets/login/vendor/select2/select2.min.css',
    '../../assets/login/vendor/daterangepicker/daterangepicker.css',
    '../../assets/login/css/util.css',
    '../../assets/login/css/main.css'
  ]
})

export class HKSingupPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private httpService: HttpService,
    private openDataService: OpenDataService,
    private modalCtrl: ModalController
  ) { }

  signupForm: FormGroup;
  isSubmit: boolean = false;

  maxYear: number = new Date().getFullYear() - 18;

  bloodGroups: Array<any> = [];

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'surname': ['', [Validators.required]],
      'birthday': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email, Validators.pattern(patterns.emailPattern)]],
      'password': ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  signup() {
    this.isSubmit = true;

    if (this.signupForm.valid) {
      const obj = {
        name: this.signupForm.value.name,
        surname: this.signupForm.value.surname,
        birthday: this.signupForm.value.birthday,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      this.httpService.register(obj).toPromise().then((result) => {

        this.modalCtrl.create(ParamsModal, result, { enableBackdropDismiss: false }).present().then(() => {
          this.httpService.login(obj.email, obj.password, 'default-user').toPromise().then(result => {

            localStorage.setItem('user-info', JSON.stringify(result));

            this.navCtrl.setRoot(DefaultUserDashboardPage);
          })
        });

      });
    }
  }

  get sf() { return this.signupForm.controls }

  routeLoginPage() {
    this.navCtrl.setRoot(HKLoginPage);
  }
}