import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodRequestListPage } from './blood-request-list';

@NgModule({
  declarations: [
    BloodRequestListPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodRequestListPage),
  ],
})
export class BloodRequestListPageModule {}
