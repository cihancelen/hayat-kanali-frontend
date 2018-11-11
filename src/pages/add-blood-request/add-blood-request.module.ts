import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBloodRequestPage } from './add-blood-request';

@NgModule({
  declarations: [
    AddBloodRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBloodRequestPage),
  ],
})
export class AddBloodRequestPageModule {}
