import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PopUpNotificationComponent } from "./../../components/pop-up-notification/pop-up-notification.component";
import { myEnterAnimationNotif } from 'src/app/animations/enterNotif';
import { myLeaveAnimationNotif } from 'src/app/animations/leaveNotif';

@Component({
  selector: "app-pop-up-requalification-card",
  templateUrl: "./pop-up-requalification-card.page.html",
  styleUrls: ["./pop-up-requalification-card.page.scss"]
})
export class PopUpRequalificationCardPage implements OnInit {
  showPopover: boolean = false;
  private modalOpen: boolean = false;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  closePopover() {
    this.showPopover = false;
  }
  openPopover() {
    this.showPopover = true;
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  async openModalNotification() {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const modal = await this.modalController.create({
        component: PopUpNotificationComponent,
        cssClass: "notificationCSS",
        enterAnimation: myEnterAnimationNotif,
        leaveAnimation: myLeaveAnimationNotif
      });
      modal.onDidDismiss()
      .then(() => {
        if ( this.modalOpen  == true)
        {
          this.modalOpen  = false;
        }
     });
      return await modal.present();
    }
  }
}
