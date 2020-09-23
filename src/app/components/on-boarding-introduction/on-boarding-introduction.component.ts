import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnBoardingDeclineComponent } from '../on-boarding-decline/on-boarding-decline.component';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-on-boarding-introduction',
  templateUrl: './on-boarding-introduction.component.html',
  styleUrls: ['./on-boarding-introduction.component.scss'],
})
export class OnBoardingIntroductionComponent implements OnInit {

  constructor(private modalController: ModalController,
              private sharedDataService: SharedDataService) { }

  ngOnInit() {}

  async closeModal() {
    // const onClosedData: string = "Wrapped Up!";
    // await this.modalController.dismiss(onClosedData);
    // this.openModalOnBoardingDecline();
    console.log('here')
    this.sharedDataService.popupAccept = false;
    this.sharedDataService.popupDecline = true;
  }

  async openModalOnBoardingDecline() {
    const modal = await this.modalController.create({
      component: OnBoardingDeclineComponent,
      cssClass: 'onBoardingDeclineModal',
      animated: false
    });

    return await modal.present();
  }

}
