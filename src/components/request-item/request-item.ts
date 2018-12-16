import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from 'ionic-angular';
import { BloodRequestDetailPage } from '../../pages/blood-request-detail/blood-request-detail';

@Component({
  selector: 'request-item',
  templateUrl: 'request-item.html'
})
export class RequestItemComponent implements OnInit {

  @Input() request: any;
  
  constructor() { }

  ngOnInit() { }

}
