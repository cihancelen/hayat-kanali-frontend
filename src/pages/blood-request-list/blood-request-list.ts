import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-blood-request-list',
  templateUrl: 'blood-request-list.html',
})
export class BloodRequestListPage implements OnInit {

  constructor(
    private firebase: AngularFireDatabase,
    private navCtrl: NavController
  ) { }

  requests: Array<any> = [];
  isLogin: boolean = false;

  ngOnInit() {
    this.isLogin = localStorage.getItem('token') ? true : false;

    this.firebase.list('blood-requests').valueChanges().subscribe(data => {
      this.requests = data;
    })
  }

  goToLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }
}
