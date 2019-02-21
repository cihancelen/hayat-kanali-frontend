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
import { OpenDataService } from '../services/open.data.service';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { HospitalService } from '../services/hospital.service';
import { EmployeeService } from '../services/employee.service';

//Firebase

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { Enviroment } from './enviroment';
import { BloodService } from '../services/blood.service';
import { AddPatientPage } from '../pages/add-patient/add-patient';
import { PatientListPage } from '../pages/patient-list/patient-list';
import { PatientDetailPage } from '../pages/patient-detail/patient-detail';
import { BloodRequestListPage } from '../pages/blood-request-list/blood-request-list';
import { BloodRequestDetailPage } from '../pages/blood-request-detail/blood-request-detail';
import { ActivePipe } from '../pipes/active.pipe';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { BackgroundMode } from '@ionic-native/background-mode';
import { PageLoaderComponent } from '../components/page-loader/page-loader.component';
import { LoaderService } from '../services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HKLoginPage } from '../pages/hk-login/hk-login.page';
import { HKSingupPage } from '../pages/hk-signup/hk-signup.page';
import { ParamsModal } from '../pages/params-modal/params.modal';
import { UserComingListPage } from '../pages/user-coming-list/user-coming-list.page';
import { UserRequestPipe } from '../pipes/user-request.pipe';
import { DefaultUserRequestDetailPage } from '../default-user-request-detail/default-user-request-detail.page';
import { BloodRequestDataService } from '../services/blood-request-data.service';
import { HKHospitalLogin } from '../pages/hk-hospital-login/hk-hospital-login.page';
import { RequestDetailPage } from '../pages/request-detail/request-detail.page';

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
    AddPatientPage,
    PatientListPage,
    PatientDetailPage,
    BloodRequestListPage,
    BloodRequestDetailPage,
    GeneralMenuComponent,
    GeneralToolbarComponent,
    RequestItemComponent,
    ActivePipe,
    PageLoaderComponent,
    HKLoginPage,
    HKSingupPage,
    ParamsModal,
    UserComingListPage,
    UserRequestPipe,
    DefaultUserRequestDetailPage,
    HKHospitalLogin,
    RequestDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
      monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
      backButtonText: ''
    }),
    HttpModule,
    AngularFireModule.initializeApp(Enviroment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
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
    AddPatientPage,
    PatientListPage,
    PatientDetailPage,
    BloodRequestListPage,
    BloodRequestDetailPage,
    GeneralMenuComponent,
    GeneralToolbarComponent,
    RequestItemComponent,
    PageLoaderComponent,
    HKLoginPage,
    HKSingupPage,
    ParamsModal,
    UserComingListPage,
    DefaultUserRequestDetailPage,
    HKHospitalLogin,
    RequestDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NotificationService,
    HttpService,
    OpenDataService,
    AuthService,
    UserService,
    HospitalService,
    EmployeeService,
    BloodService,
    ActivePipe,
    LocalNotifications,
    BackgroundMode,
    LoaderService,
    UserRequestPipe,
    BloodRequestDataService
  ]
})
export class AppModule { }
