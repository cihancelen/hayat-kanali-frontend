import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-blood-request-list',
  templateUrl: 'blood-request-list.html',
})
export class BloodRequestListPage  implements OnInit{

  constructor(
    private firebase: AngularFireDatabase
  ){}

  requests: Array<any> = [];
  
  ngOnInit(){
    this.firebase.list('blood-requests').valueChanges().subscribe(data =>{
      this.requests = data;
    })
  }

}
