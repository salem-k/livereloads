import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-pop-up-detail",
  templateUrl: "./pop-up-detail.page.html",
  styleUrls: ["./pop-up-detail.page.scss"]
})
export class PopUpDetailPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss();
  }
}
