import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MessageService } from "../../providers/message-service/message.service";

@Component({
  selector: "app-pop-up-invit",
  templateUrl: "./pop-up-invit.page.html",
  styleUrls: ["./pop-up-invit.page.scss"]
})
export class PopUpInvitPage implements OnInit {
  starBlack: boolean = true;
  textArea: boolean = false;
  loader;
  user: any = [];
  @Input() value: any;
  messageInvit: any;

  constructor(
    private modalController: ModalController,
    private messageService: MessageService
  ) {
    if (localStorage.getItem("default_msg")) {
    this.messageInvit = localStorage.getItem("default_msg");
    } else {
      this.messageInvit = localStorage.getItem("default_msgWS");
      this.starBlack = false;
    }
  }

  ngOnInit() {
    console.log(this.value);
    this.user = this.value;
  }

  modifText() {
    if (!this.textArea) {
      this.textArea = true;
      this.starBlack = !this.starBlack;
    }
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  sentInvit(): void {
    this.modalController.dismiss({ send: true, text: this.messageInvit });
  }

  changeIconStar() {
    this.starBlack = !this.starBlack;
    if (this.starBlack) {
      this.textArea = false;

      this.messageService
        .saveDefautlMessge({ content: this.messageInvit, type: "I" })
        .subscribe(data => {
          console.log(data);
          localStorage.setItem("default_msg", this.messageInvit);
        });
    }
  }
}
