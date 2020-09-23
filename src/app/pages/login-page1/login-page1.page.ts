import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { NavController } from '@ionic/angular';
import { fancyAnimation } from 'src/app/animations/enterAnimNavPage';
@Component({
  selector: "app-login-page1",
  templateUrl: "./login-page1.page.html",
  styleUrls: ["./login-page1.page.scss"]
})
export class LoginPage1Page implements OnInit {
  constructor(private router: Router,
              private navCtrl: NavController
    ) {}

  ngOnInit() {
  }
  signIn() {
    this.navCtrl.navigateForward('login-page',{animation:fancyAnimation})
  }
  signUp() {
    this.navCtrl.navigateForward('valider-cgu', {animated: false})
  }
}
