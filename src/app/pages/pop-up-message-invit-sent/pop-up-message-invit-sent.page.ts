import { Component, OnInit } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { PopUpNotificationComponent } from "./../../components/pop-up-notification/pop-up-notification.component";

@Component({
  selector: "app-pop-up-message-invit-sent",
  templateUrl: "./pop-up-message-invit-sent.page.html",
  styleUrls: ["./pop-up-message-invit-sent.page.scss"]
})
export class PopUpMessageInvitSentPage implements OnInit {
  showPopover: boolean = true;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  closePopover() {
    this.showPopover = false;
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopUpNotificationComponent,
      // event: ev,
      cssClass: "notificationCSS",
      translucent: true
    });
    return await popover.present();
  }
}
