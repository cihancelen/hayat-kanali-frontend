import { Component, OnInit } from "@angular/core";
import { MenuController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  windowHeight: number = window.innerHeight;
  segmentType: string = 'active';

  constructor() { }

  ngOnInit() { }

}
