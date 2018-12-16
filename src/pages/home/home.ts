import { Component, OnInit } from "@angular/core";
import { MenuController, NavController } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { BloodRequestDetailPage } from "../blood-request-detail/blood-request-detail";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  windowHeight: number = window.innerHeight;
  segmentType: string = 'active';

  activeRequests: Array<any> = [];
  deactiveRequests: Array<any> = [];

  constructor(
    private firebase: AngularFireDatabase,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    let hospitalId = JSON.parse(localStorage.getItem('hospital-info')).id;

    this.firebase.list('blood-requests/').snapshotChanges().subscribe(data => {
      this.activeRequests = [];

      data.forEach((elem: any) => {
        var el = elem.payload.toJSON();

        if (el.patient.hospitalId == hospitalId && el.isActive) {
          el['key'] = elem.key;
          this.activeRequests.push(el);
        }

        if (el.patient.hospitalId == hospitalId && !el.isActive) {
          el['key'] = elem.key;
          this.deactiveRequests.push(el);
        }

      })
    });
  }

  goDetail(request: any) {
    this.navCtrl.push(BloodRequestDetailPage, request.key);
  }

}
