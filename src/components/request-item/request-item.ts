import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from 'ionic-angular';
import { BloodRequestDetailPage } from '../../pages/blood-request-detail/blood-request-detail';

@Component({
  selector: 'request-item',
  templateUrl: 'request-item.html'
})
export class RequestItemComponent implements OnInit {

  patients: Array<any> = [];

  constructor(
    private database: AngularFireDatabase,
    private navCtrl: NavController
  ) {
    let hospitalId = JSON.parse(localStorage.getItem('hospital-info')).id;

    this.database.list('blood-requests/').snapshotChanges().subscribe(data => {
      data.forEach((elem: any) => {
        var el = elem.payload.toJSON();

        if(el.patient.hospitalId == hospitalId){
          el['key'] = elem.key;
          this.patients.push(el);
        }
        
      })
    });

  }

  ngOnInit() {

    this.database.database.ref('blood-requests/').on('child_added', function (data) {
      // console.log(data);
    })

    // this.database.list('blood-requests/').stateChanges().subscribe(data => {
    //   console.log(data);
    // })

    // if (this.patients.length != this.zz) {
    //   console.log('yeni talep geldi.');
    // }

  }

  goDetail(request: any) {
    this.navCtrl.push(BloodRequestDetailPage, request.key);
  }

}
