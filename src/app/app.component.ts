import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { DefaultUserDashboardPage } from "../pages/default-user-dashboard/default-user-dashboard";
import { HomePage } from "../pages/home/home";
import { LoaderService } from "../services/loader.service";
import { BloodRequestListPage } from "../pages/blood-request-list/blood-request-list";
import { URLSearchParams } from "@angular/http";
import { HKHospitalLogin } from "../pages/hk-hospital-login/hk-hospital-login.page";
import { OpenDataService } from "../services/open.data.service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  
  rootPage: any;
  isShowLoader: boolean = this.loaderService.isShowLoader || false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loaderService: LoaderService,
    private openDataService: OpenDataService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    /** Kan gruplarini cekiyoruz */
    this.getBloodGroups();

    const params = new URLSearchParams(window.location.search);
    let param = params.get('?login');

    if (localStorage.getItem('user-info')) {
      this.rootPage = DefaultUserDashboardPage;
    }
    else if (localStorage.getItem('hospital-info')) {
      this.rootPage = HomePage;
    }
    else if (localStorage.getItem('employee-info')) {
      this.rootPage = HomePage;
    }
    else if (param === 'hospital')
      this.rootPage = HKHospitalLogin;
    else {
      this.rootPage = BloodRequestListPage;
    }
  }

  getBloodGroups(){
    this.openDataService.getBloodGroups().toPromise().then((result) =>{
      this.openDataService.changeBloodGroups(result);
    });
  }
  
}