import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-pop-up-relation",
  templateUrl: "./pop-up-relation.page.html",
  styleUrls: ["./pop-up-relation.page.scss"]
})
export class PopUpRelationPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss();
  }
  trimString(string, length) {
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
}
}
