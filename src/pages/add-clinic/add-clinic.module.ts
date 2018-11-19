import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddClinicPage } from './add-clinic';

@NgModule({
  declarations: [
    AddClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(AddClinicPage),
  ],
})
export class AddClinicPageModule {}
