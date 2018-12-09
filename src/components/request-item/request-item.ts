import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'request-item',
  templateUrl: 'request-item.html'
})
export class RequestItemComponent implements OnInit {

  patients: Array<any> = [];

  zz: number;

  constructor(
    private database: AngularFireDatabase
  ) {
    let hospitalId = JSON.parse(localStorage.getItem('hospital-info')).id;

    this.database.list('blood-requests/').valueChanges().subscribe(data => {
      data.forEach((element: any) => {
        if (element.patient.hospitalId == hospitalId) {
          this.patients.push(element);
        }
      });

      this.zz = this.patients.length;
    });

  }

  ngOnInit() {

    this.database.database.ref('blood-requests/').on('child_added', function (data){
      // console.log(data);
    })

    // this.database.list('blood-requests/').stateChanges().subscribe(data => {
    //   console.log(data);
    // })

    // if (this.patients.length != this.zz) {
    //   console.log('yeni talep geldi.');
    // }

  }

}
