import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { districtAndCities } from '../../classes/district-and-cities';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'settings-popover',
    templateUrl: 'settings-popover.component.html'
})

export class SettingPopoverComponent implements OnInit {

    constructor(
        private userService: UserService,
        private viewCtrl: ViewController
    ) { }

    user_info: any;
    cities: Array<any> = districtAndCities.districtAndCities;
    city: number;

    ngOnInit() {
        this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;
    }

    get findDistricts() {
        return this.cities.find(x => x.plaka == this.user_info.cityId).ilceleri;
    }

    updateUserInfo() {
        const obj = {
            id: this.user_info.id,
            identificationNo: this.user_info.identificationNo,
            phone: this.user_info.phone,
            bloodGroupId: this.user_info.bloodGroupId,
            usingSmokeAndAlcohol: this.user_info.usingSmokeAndAlcohol,
            lastBloodDonation: this.user_info.lastBloodDonation,
            cityId: this.user_info.cityId,
            district: this.user_info.district
        };

        this.userService.updateUserParams(this.user_info).subscribe(result => {
            localStorage.setItem('user-info', JSON.stringify(result));
        });

        this.viewCtrl.dismiss();
    }
}