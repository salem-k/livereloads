import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingShakerFeedbackComponent } from '../on-boarding-shaker-feedback/on-boarding-shaker-feedback.component';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-on-boarding-decline',
  templateUrl: './on-boarding-decline.component.html',
  styleUrls: ['./on-boarding-decline.component.scss'],
})
export class OnBoardingDeclineComponent implements OnInit {

  constructor(private modalController: ModalController,
             private sharedDataService : SharedDataService 
             ) { }

  ngOnInit() {}

  async closeModal() {
    // const onClosedData: string = "Wrapped Up!";
    // await this.modalController.dismiss(onClosedData);

    // this.openModalOnBoardingShakerFeedback();
    this.sharedDataService.popupDecline = false;
    // this.sharedDataService.popupShake = true;
  }

  async openModalOnBoardingShakerFeedback() {
    const modal = await this.modalController.create({
      component: OnBoardingShakerFeedbackComponent,
      cssClass: 'onBoardingShakerFeedbackModal',
      animated: false
    });

    return await modal.present();
  }
}
