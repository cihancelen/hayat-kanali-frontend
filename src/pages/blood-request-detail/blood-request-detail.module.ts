import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodRequestDetailPage } from './blood-request-detail';

@NgModule({
  declarations: [
    BloodRequestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodRequestDetailPage),
  ],
})
export class BloodRequestDetailPageModule {}
