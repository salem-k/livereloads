import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, Scroll } from "@angular/router";
import { SharedDataService } from "../../../providers/shared-data/shared-data.service";
import { UserService } from "../../../providers/user-service/user.service";
import {LinkedinServiceService} from "../../../providers/linkedin-service/linkedin-service.service";
import {Device} from "@ionic-native/device/ngx";
import {HttpClient} from "@angular/common/http";
import {NetworkService} from "../../../providers/salesfriends/network/network.service";
import { NavController } from '@ionic/angular';
import { myEnterAnimation } from 'src/app/animations/enter';
import { Animation, createAnimation } from '@ionic/core';
import { AnimationController } from '@ionic/angular';
import { myEnterAnimationPage } from 'src/app/animations/enterPage';
import { fancyAnimation } from 'src/app/animations/enterAnimNavPage';

@Component({
  selector: "app-valider-cgu",
  templateUrl: "./valider-cgu.component.html",
  styleUrls: ["./valider-cgu.component.scss"]
})
export class ValiderCguComponent implements OnInit {
  @ViewChild(Scroll) scrollElement: Scroll;
  cgUReaded = false;

  networks: any;
  info: any;

  totalNetwork
  compteurRequettes = 0
  constructor(
    private router: Router,
    private sharedData: SharedDataService,
    private userService: UserService,
    private linkedinService: LinkedinServiceService,
    private networkService: NetworkService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    localStorage.setItem("token","")
  }

  async logScrolling($event) {
    // only send the event once
    if (this.cgUReaded) {
      return;
    }

    if ($event.target.localName != "ion-content") {
      // not sure if this is required, just playing it safe
      return;
    }

    const scrollElement = await $event.target.getScrollElement();
    //console.log({scrollElement});

    // minus clientHeight because trigger is scrollTop
    // otherwise you hit the bottom of the page before
    // the top screen can get to 80% total document height
    const scrollHeight =
      scrollElement.scrollHeight - scrollElement.clientHeight;
    //console.log({scrollHeight});

    const currentScrollDepth = $event.detail.scrollTop;
    //console.log({currentScrollDepth});

    const targetPercent = 80;

    let triggerDepth = (scrollHeight / 100) * targetPercent;
    //console.log({triggerDepth});

    if (currentScrollDepth > triggerDepth) {
      //console.log(`Scrolled to ${targetPercent}%`);
      this.cgUReaded = true;
    }
  }
  signUp(){
    this.navCtrl.navigateForward('synch-linked-in-page',{animation:fancyAnimation})
  }
  goLoginScreen(){
    this.navCtrl.navigateForward('login-page',{animation:fancyAnimation})
  }
}
