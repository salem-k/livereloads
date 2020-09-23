import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-synch-linked-in-page",
  templateUrl: "./synch-linked-in-page.page.html",
  styleUrls: ["./synch-linked-in-page.page.scss"]
})
export class SynchLinkedInPagePage implements OnInit {
  toggleValue1: boolean = false;
  toggleValue2: boolean = false;
  toggleValue3: boolean = false;
  toggleValue4: boolean = false;
  buttonSynchronize: boolean = false;
  time: number = 0;
  interval;
  interval2;
  val1;
  password: any = "";
  email: any = "";
  interval3;
  languageUser: "French";
  toggleValue: boolean = false;

  constructor(
    public platform: Platform,
    private router: Router,
    private iab: InAppBrowser,
  ) {}

  ngOnInit() {}
  
  goLoginScreen(){
    this.router.navigate([
      "/login-page",
    ]);
  }
  loginWithLinkedIn() {
    this.router.navigate(["/inappbrowser"]);
  }
  cardToggle() {
    if (
      this.toggleValue == false &&
      this.toggleValue1 == false &&
      this.toggleValue2 == false &&
      this.toggleValue3 == false && this.toggleValue4 == false
    ) {
      this.toggleValue = true;
      let interval = setTimeout(() => {
        this.toggleValue1 = true;
      }, 150);

      let interval2 = setTimeout(() => {
        this.toggleValue2 = true;
      }, 300);

      let interval3 = setTimeout(() => {
        this.toggleValue3 = true;
      }, 450);
      let interval4 = setTimeout(() => {
        this.toggleValue4 = true;
        this.buttonSynchronize = true;
      }, 600);
    } else {
      this.toggleValue = false;
      this.toggleValue1 = false;
      this.toggleValue2 = false;
      this.toggleValue3 = false;
      this.toggleValue4 = false;
      this.buttonSynchronize = false;
    }
  }
  toggle() {
    if (
      this.toggleValue1 == false &&
      this.toggleValue2 == false &&
      this.toggleValue3 == false && this.toggleValue4 == false
    ) {
      let interval = setTimeout(() => {
        this.toggleValue1 = true;
      }, 150);
      let interval2 = setTimeout(() => {
        this.toggleValue2 = true;
      }, 300);
      let interval3 = setTimeout(() => {
        this.toggleValue3 = true;
      }, 450);
      let interval4 = setTimeout(() => {
        this.toggleValue4 = true;
        this.buttonSynchronize = true;
      }, 600);
    } else {
      this.toggleValue1 = false;
      this.toggleValue2 = false;
      this.toggleValue3 = false;
      this.toggleValue4 = false;
      this.buttonSynchronize = false;
    }
  }
}
