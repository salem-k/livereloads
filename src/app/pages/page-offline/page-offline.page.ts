import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
@Component({
  selector: "app-page-offline",
  templateUrl: "./page-offline.page.html",
  styleUrls: ["./page-offline.page.scss"]
})
export class PageOfflinePage implements OnInit {
  constructor(private modalController: ModalController,
              private statusBar: StatusBar,) {
                
              }

  ngOnInit() {
   // this.statusBar.backgroundColorByHexString("#ffffff");
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
