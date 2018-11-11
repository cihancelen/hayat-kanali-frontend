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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddStaffPage,
    AddBloodRequestPage,
    GeneralMenuComponent,
    GeneralToolbarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
      monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddStaffPage,
    AddBloodRequestPage,
    GeneralMenuComponent,
    GeneralToolbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
