import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultUserDashboardPage } from './default-user-dashboard';

@NgModule({
  declarations: [
    DefaultUserDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultUserDashboardPage),
  ],
})
export class DefaultUserDashboardPageModule {}
