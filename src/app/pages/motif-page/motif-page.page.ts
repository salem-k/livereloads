import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { OnBoardingIntroductionComponent } from "src/app/components/on-boarding-introduction/on-boarding-introduction.component";

@Component({
  selector: "app-motif-page",
  templateUrl: "./motif-page.page.html",
  styleUrls: ["./motif-page.page.scss"]
})
export class MotifPagePage implements OnInit {
  interval;
  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss();
  }
  async goCardPageWithPopUp() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss();
    this.router.navigate(["/footer/synchTab2"]);
    // this.interval = setTimeout(() => {
    //     this.openModalOnBoardingIntroduction();
    //     clearInterval(this.interval);
    // }, 1000);
  }

  async openModalOnBoardingIntroduction() {
    const modal = await this.modalController.create({
      component: OnBoardingIntroductionComponent,
      cssClass: "onBoardingIntroductionModal",
      animated: false
    });

    return await modal.present();
  }
}
