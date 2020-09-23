import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-notification',
  templateUrl: './pop-up-notification.component.html',
  styleUrls: ['./pop-up-notification.component.scss'],
})
export class PopUpNotificationComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
