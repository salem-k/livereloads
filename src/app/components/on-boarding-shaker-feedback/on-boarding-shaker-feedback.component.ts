import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-on-boarding-shaker-feedback',
  templateUrl: './on-boarding-shaker-feedback.component.html',
  styleUrls: ['./on-boarding-shaker-feedback.component.scss'],
})
export class OnBoardingShakerFeedbackComponent implements OnInit {

  constructor(private modalController: ModalController,
    private sharedDataService: SharedDataService) { }

  ngOnInit() {}

  async closeModal() {
    // const onClosedData: string = "Wrapped Up!";
    // await this.modalController.dismiss(onClosedData);
    this.sharedDataService.popupShake = false;
  }

}
