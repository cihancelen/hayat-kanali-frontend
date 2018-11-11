import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    private navCtrl:NavController
  ) {}

  segment: string = 'login';
  loginType:string = 'default-user';
  
  login(){
    this.navCtrl.setRoot(HomePage);
  }
}
