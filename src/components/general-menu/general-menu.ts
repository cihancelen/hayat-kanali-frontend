import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import { AddStaffPage } from "../../pages/add-staff/add-staff";
import { AddBloodRequestPage } from "../../pages/add-blood-request/add-blood-request";
import { LoginPage } from "../../pages/login/login";
import { UserSettingsPage } from "../../pages/user-settings/user-settings";
import { AddClinicPage } from "../../pages/add-clinic/add-clinic";
import { AddPatientPage } from "../../pages/add-patient/add-patient";
import { PatientListPage } from "../../pages/patient-list/patient-list";
import { BloodRequestListPage } from "../../pages/blood-request-list/blood-request-list";
import { UserComingListPage } from "../../pages/user-coming-list/user-coming-list.page";

@Component({
  selector: "general-menu",
  templateUrl: "general-menu.html"
})
export class GeneralMenuComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  isAdmin: boolean = false;
  isEmployee: boolean = false;
  isUser: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('hospital-info')) {
      this.isAdmin = true;
    }
    if (localStorage.getItem('employee-info')) {
      this.isEmployee = true;
    }
    if (localStorage.getItem('user-info')) {
      this.isUser = true;
    }
  }

  goAddStaff() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(AddStaffPage);
  }

  goAddRequestPage() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(AddBloodRequestPage);
  }

  logout() {
    localStorage.clear();

    this.menuCtrl.close('generalMenu');
    this.navCtrl.setRoot(BloodRequestListPage);
  }

  updateSettings() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(UserSettingsPage);
  }

  goAddClinic() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(AddClinicPage);
  }

  goAddPatient() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(AddPatientPage);
  }

  goPatientList() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(PatientListPage);
  }

  goBloodRequestList() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(BloodRequestListPage);
  }

  goUserComingList(){
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(UserComingListPage);
  }

}