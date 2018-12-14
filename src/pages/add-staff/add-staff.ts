import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HospitalService } from '../../services/hospital.service';
import { NotificationService } from '../../services/notification.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-staff',
  templateUrl: 'add-staff.html',
})
export class AddStaffPage {

  constructor(
    private hospitalService: HospitalService,
    private notificationService: NotificationService,
    private navCtrl: NavController 
  ) { }

  employee: any = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    hospitalId: JSON.parse(localStorage.getItem('hospital-info')).id
  };

  addEmployee() {
    this.hospitalService.addEmployee(this.employee).subscribe(data =>{
      this.notificationService.notification('Personel başarıyla eklenmiştir.');

      this.navCtrl.setRoot(HomePage);
    },err =>{
      console.log(err);
    })
  }

}
