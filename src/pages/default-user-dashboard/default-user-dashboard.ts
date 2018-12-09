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

  requestsLength: number = 0;
  
  ngOnInit() {
    this.database.list('blood-requests/').valueChanges().subscribe(data =>{
      this.requestsLength = data.length;
      
      
    })
  }

  goToRequest(item) {

  }
}
