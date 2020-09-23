import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-new-search-criteres-details",
  templateUrl: "./new-search-criteres-details.page.html",
  styleUrls: ["./new-search-criteres-details.page.scss"]
})
export class NewSearchCriteresDetailsPage implements OnInit {
  constructor(private location: Location, private modalCtrl: ModalController) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
