import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { myEnterAnimation } from "src/app/animations/enter";
import { myLeaveAnimation } from "src/app/animations/leave";
import { LinkedinServiceService } from "../../providers/linkedin-service/linkedin-service.service";
import { MessageService } from "../../providers/message-service/message.service";
import { SharedDataService } from "../../providers/shared-data/shared-data.service";
import { PopUpMessageInvitSentPage } from "../pop-up-message-invit-sent/pop-up-message-invit-sent.page";

@Component({
  selector: "app-pop-up-message-invit",
  templateUrl: "./pop-up-message-invit.page.html",
  styleUrls: ["./pop-up-message-invit.page.scss"]
})
export class PopUpMessageInvitPage implements OnInit {
  starBlack: boolean = false;
  textArea: boolean = false;
  networks: any;
  loader;
  @Input() value: any;
  messageInvit: any = localStorage.getItem("default_msg");
  constructor(
    private modalController: ModalController,
    private linkedinService: LinkedinServiceService,
    private sharedDataService: SharedDataService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const net: any = localStorage.getItem("myNetwork");

    this.networks = JSON.parse(net);
  }

  modifText() {
    if (!this.textArea) {
      this.textArea = true;
      this.starBlack = !this.starBlack;
    }
  }

  async closeModal() {
    this.messageService
      .saveMsg({
        type: "R",
        content: " ",
        status: "P",
        receiver: 211,
        from_search: this.sharedDataService.getFromSearch()
      })
      .subscribe(
        async data => {
          console.log(data);
        },
        error => {}
      );
    await this.modalController.dismiss();
  }

  async openModalPopUpMessageInvitSent() {
    const modal = await this.modalController.create({
      component: PopUpMessageInvitSentPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  changeIconStar() {
    this.starBlack = !this.starBlack;
    if (this.starBlack) {
      this.textArea = false;
      this.messageService
        .saveDefautlMessge(this.messageInvit)
        .subscribe(data => {
          console.log(data);
          localStorage.setItem("default_msg", this.messageInvit);
        });
    }
  }
  async sendMessage() {
    this.sharedDataService.showLoading();

    this.linkedinService.getCookiesLinkedin().then(data => {
      this.linkedinService
        .loginLinkedin(
          localStorage.getItem("email"),
          localStorage.getItem("password")
        )
        .then(async data2 => {
          this.networks.forEach(element => {
            this.linkedinService
              .sendMessage(
                this.messageInvit
                  .replace("<br>", "\n")
                  .replace("<br>", "\n")
                  .replace("<br>", "\n")
                  .replace("<br><br><br>", "\n")
                  .replace('<span class="textCard2">', "\n")
                  .replace("</span>", "")
                  .replace("<br><br>", "\n"),
                element.entityUrn.replace("urn:li:fsd_profile:", "")
              )
              .then(async dataSendMessage => {
                this.sharedDataService.hideLoading();
                this.messageService
                  .saveMsg({
                    type: "I",
                    content: this.messageInvit,
                    status: "P",
                    receiver: "43338"
                  })
                  .subscribe(
                    async data => {
                      const modal = await this.modalController.create({
                        component: PopUpMessageInvitSentPage,
                        enterAnimation: myEnterAnimation,
                        leaveAnimation: myLeaveAnimation
                      });
                      return await modal.present();
                    },
                    error => {
                      this.sharedDataService.hideLoading();
                    }
                  );
              })
              .catch(async err => {
                this.sharedDataService.hideLoading();
              });
          });
        });
    });
  }
}
