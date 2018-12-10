import { Component } from "@angular/core";
import { Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { AddStaffPage } from "../pages/add-staff/add-staff";
import { AddBloodRequestPage } from "../pages/add-blood-request/add-blood-request";
import { DefaultUserDashboardPage } from "../pages/default-user-dashboard/default-user-dashboard";
import { UserSettingsPage } from "../pages/user-settings/user-settings";
import { HospitalSettingsPage } from "../pages/hospital-settings/hospital-settings";
import { AddClinicPage } from "../pages/add-clinic/add-clinic";
import { AddPatientPage } from "../pages/add-patient/add-patient";
import { PatientListPage } from "../pages/patient-list/patient-list";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    if (localStorage.getItem('user-info')) {
      this.rootPage = DefaultUserDashboardPage;
    }
    else if (localStorage.getItem('hospital-info')) {
      this.rootPage = PatientListPage;
    }
    else if (localStorage.getItem('employee-info')) {
      this.rootPage = HomePage;
    }
    else {
      this.rootPage = LoginPage;
    }
  }
}