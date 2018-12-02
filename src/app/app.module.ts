import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GeneralMenuComponent } from '../components/general-menu/general-menu';
import { AddStaffPage } from '../pages/add-staff/add-staff';
import { GeneralToolbarComponent } from '../components/general-toolbar/general-toolbar';
import { AddBloodRequestPage } from '../pages/add-blood-request/add-blood-request';
import { RequestItemComponent } from '../components/request-item/request-item';
import { DefaultUserDashboardPage } from '../pages/default-user-dashboard/default-user-dashboard';
import { UserSettingsPage } from '../pages/user-settings/user-settings';
import { HospitalSettingsPage } from '../pages/hospital-settings/hospital-settings';
import { AddClinicPage } from '../pages/add-clinic/add-clinic';
import { NotificationService } from '../services/notification.service';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddStaffPage,
    AddBloodRequestPage,
    DefaultUserDashboardPage,
    UserSettingsPage,
    HospitalSettingsPage,
    AddClinicPage,
    GeneralMenuComponent,
    GeneralToolbarComponent,
    RequestItemComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
      monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddStaffPage,
    AddBloodRequestPage,
    DefaultUserDashboardPage,
    UserSettingsPage,
    HospitalSettingsPage,
    AddClinicPage,
    GeneralMenuComponent,
    GeneralToolbarComponent,
    RequestItemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NotificationService
  ]
})
export class AppModule { }
