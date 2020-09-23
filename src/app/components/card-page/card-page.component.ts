import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingIntroductionComponent } from '../on-boarding-introduction/on-boarding-introduction.component';
import { OnBoardingDeclineComponent } from '../on-boarding-decline/on-boarding-decline.component';
import { OnBoardingShakerFeedbackComponent } from '../on-boarding-shaker-feedback/on-boarding-shaker-feedback.component';
import {SharedDataService} from "../../providers/shared-data/shared-data.service";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {

  constructor(
      public modalController: ModalController,
      public sharedDataService:SharedDataService
  ) { }

  ngOnInit() {
    this.sharedDataService.popupAccept = true
  }

  async openModalOnBoardingIntroduction() {
    this.sharedDataService.popupAccept = true
    // const modal = await this.modalController.create({
    //   component: OnBoardingIntroductionComponent,
    //   cssClass: 'onBoardingIntroductionModal',
    //   animated: false
    // });

    // return await modal.present();
  }

  async openModalOnBoardingDecline() {
    if(this.sharedDataService.popupAccept == true)
    this.sharedDataService.popupAccept = false;
    this.sharedDataService.popupDecline = true
    // const modal = await this.modalController.create({
    //   component: OnBoardingDeclineComponent,
    //   cssClass: 'onBoardingDeclineModal',
    //   animated: false
    // });

    // return await modal.present();
  }

  async openModalOnBoardingShakerFeedback() {
    if(this.sharedDataService.popupDecline == true)
    this.sharedDataService.popupDecline = false;

    this.sharedDataService.popupShake = true;
    // const modal = await this.modalController.create({
    //   component: OnBoardingShakerFeedbackComponent,
    //   cssClass: 'onBoardingShakerFeedbackModal',
    //   animated: false
    // });

    // return await modal.present();
  }

}
