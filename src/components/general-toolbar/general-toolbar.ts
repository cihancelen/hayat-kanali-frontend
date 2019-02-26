import { Component, Input, OnInit } from '@angular/core';
import { MenuController, PopoverController } from 'ionic-angular';
import { SettingPopoverComponent } from '../settings-popover/setting-popover.component';

@Component({
  selector: 'general-toolbar',
  templateUrl: 'general-toolbar.html'
})
export class GeneralToolbarComponent implements OnInit {

  @Input() pageName: string;
  username: string = '';

  constructor(
    private menuCtrl: MenuController,
    private popoverCtrl: PopoverController
  ) { }

  isUser: boolean = false;

  ngOnInit() {
    var hospital = localStorage.getItem('hospital-info') ? localStorage.getItem('hospital-info') : null;
    var employee = localStorage.getItem('employee-info') ? localStorage.getItem('employee-info') : null;
    var user = localStorage.getItem('user-info') ? localStorage.getItem('user-info') : null;

    if (hospital != null) {
      this.username = JSON.parse(hospital).name;
    }
    if (employee != null) {
      this.username = JSON.parse(employee).name;
    }
    if (user != null) {
      this.username = JSON.parse(user).name;
      this.isUser = true;
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle("generalMenu");
  }

  presentPop(event) {
    this.popoverCtrl.create(SettingPopoverComponent).present({ ev: event });
  }

}
