import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hospital-settings',
  templateUrl: 'hospital-settings.html',
})
export class HospitalSettingsPage {

  segment: string = 'general-info'

  constructor() { }

}
