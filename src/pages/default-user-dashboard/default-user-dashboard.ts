import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-default-user-dashboard',
  templateUrl: 'default-user-dashboard.html',
})
export class DefaultUserDashboardPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private database: AngularFireDatabase
  ) { }

  requests: Array<any> = [];
  user_info: any = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

  ngOnInit() {
    this.user_info = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null;

    this.database.list('blood-requests/').snapshotChanges().subscribe(data => {
      data.forEach(element => {
        var key = element.key;
        var json = element.payload.toJSON();
        json['key'] = key;
        
        // if (element.hospital.district == this.user_info.district) {
        //   this.requests.push(element);
        // }
      });
    })
  }

  goToRequest(item) {

  }
}
