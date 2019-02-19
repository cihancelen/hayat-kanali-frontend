import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { DefaultUserDashboardPage } from "../pages/default-user-dashboard/default-user-dashboard";
import { HomePage } from "../pages/home/home";
import { LoaderService } from "../services/loader.service";
import { HKLoginPage } from "../pages/hk-login/hk-login.page";
import { LoginPage } from "../pages/login/login";
import { BloodRequestListPage } from "../pages/blood-request-list/blood-request-list";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    if (localStorage.getItem('user-info')) {
      this.rootPage = DefaultUserDashboardPage;
    }
    else if (localStorage.getItem('hospital-info')) {
      this.rootPage = HomePage;
    }
    else if (localStorage.getItem('employee-info')) {
      this.rootPage = HomePage;
    }
    else {
      this.rootPage = BloodRequestListPage;
    }
  }
}