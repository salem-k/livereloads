import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { Network } from "@ionic-native/network/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonRouterOutlet, ModalController, Platform } from "@ionic/angular";
import { PageOfflinePage } from "./pages/page-offline/page-offline.page";
import { NetworkService } from "./providers/salesfriends/network/network.service";
import { environment } from "../environments/environment";
import { RouterOutletService } from "./services/RouterOutletService";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import {LinkedinServiceService} from "./providers/linkedin-service/linkedin-service.service";
import { MessageService } from './providers/message-service/message.service';

import {TranslateService} from '@ngx-translate/core';
import { SharedDataService } from './providers/shared-data/shared-data.service';

declare let cordova: any;
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  networks: any = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private network: Network,
    private modalController: ModalController,
    private router: Router,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    private routerOutletService: RouterOutletService,
    private linkedinService: LinkedinServiceService,
    public backgroundMode: BackgroundMode,
    private messageService: MessageService,
    public translate: TranslateService,
    private shared: SharedDataService
  ) {
    this.initializeApp();
  }
  // ngAfterViewInit(): void {
  //   this.routerOutletService.init(this.routerOutlet);
  // }

  initializeApp() {
    this.platform.ready().then(() => {

      this.initTranslationService();
      this.splashScreen.hide();
      if (this.platform.is("android")) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString("#010101");
        this.statusBar.backgroundColorByName("black");
      }

      this.checkConnected();

      this.keyboard.hideFormAccessoryBar(true);
      this.checkConnection();
      this.initInstabug();
/*
      this.messageService.getDefautlMessgeType().subscribe((data: any) => {
        if (data.length != 0){
          localStorage.setItem('default_msg', data.content);
        }else {
          this.messageService.getDefautlMessge("I").subscribe((data: any) => {

            localStorage.setItem('default_msg', data.content + "<br> http://www.google.com");
          });
        }
     
      });
*/
/*
      //Search when background mode
      this.backgroundMode.enable();
      this.backgroundMode.on("activate").subscribe(() => {
        console.log("this.backgroundMode.on(\"activate\")")
        //expert traduction amazigh 8 résultats
        //directeur => 16000 resultats
        //expert extjs > 3000 resultats
        localStorage.setItem("searchInProgress",JSON.stringify({pageCounter:0,keywords:'marin'}))
        localStorage.setItem("backgroundMode","1")
        this.linkedinService.doSearch()
      })
      this.backgroundMode.on("deactivate").subscribe(() => {
        console.log("this.backgroundMode.on(\"deactivate\")")
        localStorage.setItem("backgroundMode","0")
      })
*/
      this.routerOutletService.init(this.routerOutlet);
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener(
          "backbutton",
          function (event) {
            event.preventDefault();
            event.stopPropagation();
          },
          false
        );
      });


     // this.clearNotifications();
      //TODO corrgier cette erreur
      cordova.plugins.notification.badge.clear();
     
  

      FCM.onTokenRefresh().subscribe(token => {
        alert(token);

        localStorage.setItem("fcm_token", token);
      });

      console.log("I m ready");

      console.log("I m ready");
      FCM.onNotification().subscribe((payload: any) => {
        console.log(payload);
      });

      if (this.platform.is("ios")) {
        this.requestFCMIos();
      }
      FCM.getToken().then((token) => {
        console.log("FCM TOKEN", token);
        localStorage.setItem("fcm_token", token);
      });
      console.log("I m ready");
      console.log(localStorage.getItem("token"));

     
 

      

  


      this.splashScreen.hide();

      // if(localStorage.getItem("token")){
      //   this.router.navigate(["/footer/profilTab3"]);
      // }

    });
  }
  async requestFCMIos() {
    const wasPermissionGiven: boolean = await FCM.requestPushPermission({
      ios9Support: {
        timeout: 10, // How long it will wait for a decision from the user before returning `false`
        interval: 0.3, // How long between each permission verification
      },
    });
  }
  async clearNotifications() {
    await FCM.clearAllNotifications();
  }
  initInstabug() {
    cordova.plugins.instabug.activate(
      {
        ios: "215bbb449ce26dbd2d50943835c7bf5b"
      },
      "shake", // screenshot
      function() {
        console.log("Instabug initialized.");
      },
      function(error) {
        console.log("Instabug could not be initialized - " + error);
      }
    );
    //     if (this.platform.is("android")) {
    //     cordova.plugins.instabug.activate(
    //       {
    //         android: "fa80ec97bddeb9be2ec62e0b909b0c8c"
    //       },
    //       "shake",
    //       {
    //         commentRequired: true,
    //         colorTheme: "light",
    //         enableIntroDialog: true
    //       },
    //       () => {
    //       // alert("insta bug")
    //       },
    //       error => {
    //    //  alert("Instabug could not be initialized - " + error);
    //       }
    //     );
    //   }
    //  else {
    //   cordova.plugins.instabug.activate(
    //     {
    //       ios: "fa80ec97bddeb9be2ec62e0b909b0c8c"
    //     },
    //     'shake',
    //     {
    //       commentRequired: true,
    //       colorTheme: "light",
    //       enableIntroDialog: true
    //     },
    //      ()=> {
    //         console.log('Instabug initialized.');
    //     },
    //      (error) => {
    //         console.log('Instabug could not be initialized - ' + error);
    //     }
    // );
    // }
  }
  checkConnected() {
    console.log(localStorage.getItem("styleConnect"))
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/footer/searchTab1");
    }
    /*
    if(localStorage.getItem('token')){
      this.scrapping();
    }
     */
  }
  checkConnection() {
    console.log("check connectivity")
    let disconnectSubscription = this.network
      .onDisconnect()
      .subscribe(async () => {
        console.log("subscribe network");
        this.shared.hideLoading();
        const modal = await this.modalController.create({
          component: PageOfflinePage,
          cssClass: "pageOffline",
          animated: false
        });
        await modal.present();
      });
    let connectSubscription = this.network.onConnect().subscribe(async () => {
      await this.modalController.dismiss();
    });
  }

  initTranslationService() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
