import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'request-detail.page.html'
})

export class RequestDetailPage implements OnInit {

    constructor(
        private navParams: NavParams
    ) { }

    request: any;

    ngOnInit() {
        this.request = this.navParams.data;
    }
}