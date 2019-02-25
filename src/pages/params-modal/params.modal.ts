import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenDataService } from '../../services/open.data.service';
import { districtAndCities } from '../../classes/district-and-cities';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { DefaultUserDashboardPage } from '../default-user-dashboard/default-user-dashboard';

@Component({
  selector: 'params-modal',
  templateUrl: 'params.modal.html'
})

export class ParamsModal implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private openDataService: OpenDataService,
    private navParams: NavParams,
    private userService: UserService,
    private viewCtrl: ViewController,
    private navCtrl: NavController
  ) { }

  isSubmit: boolean = false;
  paramsForm: FormGroup;
  bloodGroups: Array<any> = [];

  citiesAndDistricts: Array<any> = districtAndCities.districtAndCities;
  districtByCity: Array<any> = [];

  ngOnInit() {
    this.openDataService.bloodGroups.subscribe((result) => {
      this.bloodGroups = result;
    })

    this.paramsForm = this.formBuilder.group({
      'identity': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      'phone': ['', Validators.required],
      'bloodGroupId': [0, [Validators.required]],
      'usingSmokeAndAlcohol': [false],
      'lastBloodDonation': [null],
      'cityId': [0, [Validators.required]],
      'district': ['', [Validators.required]]
    })
  }

  findDistrict(city): any {
    this.districtByCity = this.citiesAndDistricts.find(x => x.plaka == city);
  }

  saveParams() {
    this.isSubmit = true;

    if (this.paramsForm.valid) {

      const obj = {
        id: this.navParams.data.id,
        identificationNo: this.paramsForm.value.identity,
        phone: this.paramsForm.value.phone,
        bloodGroupId: this.paramsForm.value.bloodGroupId,
        usingSmokeAndAlcohol: !this.paramsForm.value.usingSmokeAndAlcohol ? false: this.paramsForm.value.usingSmokeAndAlcohol,
        lastBloodDonation: this.paramsForm.value.lastBloodDonation,
        cityId: this.paramsForm.value.cityId,
        district: this.paramsForm.value.district
      };

      this.userService.updateUserParams(obj).toPromise().then((result) => {
        console.log(result);
        localStorage.setItem('user-info', JSON.stringify(result));

        this.viewCtrl.dismiss();

        this.navCtrl.setRoot(DefaultUserDashboardPage);
      });
    }
  }
}