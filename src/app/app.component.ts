import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { AddStaffPage } from "../pages/add-staff/add-staff";
import { AddBloodRequestPage } from "../pages/add-blood-request/add-blood-request";
import { DefaultUserDashboardPage } from "../pages/default-user-dashboard/default-user-dashboard";
import { UserSettingsPage } from "../pages/user-settings/user-settings";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = UserSettingsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
