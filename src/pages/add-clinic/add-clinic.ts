import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HospitalService } from '../../services/hospital.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-clinic',
  templateUrl: 'add-clinic.html',
})
export class AddClinicPage {

  constructor(
    private hospitalService: HospitalService,
    private notificationService: NotificationService,
    private navCtrl: NavController
  ) { }

  clinic: any = {
    name:'',
    description: ''
  }

  addClinic() {
    this.hospitalService.addClinic(this.clinic).subscribe(data =>{
      this.notificationService.notification('Klinik başarıyla eklenmiştir.');

      this.navCtrl.setRoot(HomePage);
    }, err =>{
      console.log(err);
    });
  }

}
