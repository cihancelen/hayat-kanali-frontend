import { Component, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'general-toolbar',
  templateUrl: 'general-toolbar.html'
})
export class GeneralToolbarComponent {

  @Input() pageName: string;

  constructor(private menuCtrl: MenuController) {}

  toggleMenu() {
    this.menuCtrl.toggle("generalMenu");
  }

}
