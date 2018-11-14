import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalSettingsPage } from './hospital-settings';

@NgModule({
  declarations: [
    HospitalSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalSettingsPage),
  ],
})
export class HospitalSettingsPageModule {}
