import { Component } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import { AddStaffPage } from "../../pages/add-staff/add-staff";
import { AddBloodRequestPage } from "../../pages/add-blood-request/add-blood-request";
import { LoginPage } from "../../pages/login/login";

@Component({
  selector: "general-menu",
  templateUrl: "general-menu.html"
})
export class GeneralMenuComponent {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  goAddStaff() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(AddStaffPage);
  }

  goAddRequestPage() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.push(AddBloodRequestPage);
  }

  logout() {
    this.menuCtrl.close('generalMenu');
    this.navCtrl.setRoot(LoginPage);
  }
}