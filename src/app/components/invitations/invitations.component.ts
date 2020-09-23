import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { LinkedinServiceService } from "../../providers/linkedin-service/linkedin-service.service";
import { MessageService } from "../../providers/message-service/message.service";
import { NetworkService } from "../../providers/salesfriends/network/network.service";
import { SharedDataService } from "../../providers/shared-data/shared-data.service";

@Component({
  selector: "app-invitations",
  templateUrl: "./invitations.component.html",
  styleUrls: ["./invitations.component.scss"]
})
export class InvitationsComponent implements OnInit {
  invitations: any = [];
  showFiltre: boolean = false;
  clicked1: boolean = true;
  clicked2: boolean = false;
  clicked3: boolean = false;
  clicked4: boolean = false;
  clicked5: boolean = false;
  option1 = {
    // loop: true,
    direction: "vertical",
    allowSlideNext: false
  };
  @Output() buttonClick = new EventEmitter();
  @Output() buttonClick2 = new EventEmitter();
  constructor(
    private sharedData: SharedDataService,
    private linkedinService: LinkedinServiceService,
    private messageService: MessageService,
    private networkService: NetworkService
  ) {}

  ngOnInit() {
    this.invitations = this.sharedData.getMessageInvitation();
  }
  openModalFiltre() {
    this.showFiltre = true;
    this.sharedData.popupFiltre = true;
    this.buttonClick.emit();
  }
  closeModalFiltre() {
    this.showFiltre = false;
    this.sharedData.popupFiltre = false;
    this.buttonClick.emit();
  }
  trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }
  click1() {
    this.clicked1 = true;
    this.clicked2 = false;
    this.clicked3 = false;
    this.clicked4 = false;
    this.clicked5 = false;
  }
  click2() {
    this.clicked1 = false;
    this.clicked2 = true;
    this.clicked3 = false;
    this.clicked4 = false;
    this.clicked5 = false;
  }
  click3() {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = true;
    this.clicked4 = false;
    this.clicked5 = false;
  }
  click4() {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = false;
    this.clicked4 = true;
    this.clicked5 = false;
  }
  click5() {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = false;
    this.clicked4 = false;
    this.clicked5 = true;
  }
  updateInvitation(invitation, value) {
    this.messageService.updateMessage(invitation.id, value).subscribe(data => {
      if (value == "A") {
        this.networkService
          .updateContact(invitation.sender.network_id, invitation)
          .subscribe(data => {
            console.log(data);
          });
      }
      this.getInvitation();
    });
  }
  getInvitation() {
    this.messageService.getMessageReceived().subscribe((data : any) => {
      let invitations: any = [];
      invitations = data.results;
      console.log(data);
      this.invitations = invitations.filter(e => e.status == "P");

      this.sharedData.setMessageInvitation(this.invitations);

      //   this.linkedinService.getProfile(this.invitations[0].public_identifier.replace("urn:li:fs_miniProfile:", "")).then((data)=>{
      //     const profile = JSON.parse(data.data);

      //     profile.included.forEach(element => {

      //       if (element.$type == "com.linkedin.voyager.identity.shared.MiniProfile"){

      //         this.invitation[0].picture = element.picture.rootUrl + element.picture.artifacts[2].fileIdentifyingUrlPathSegment

      //       }
      //     });

      // });
    });
  }
  slideChanged(event) {
    if (event.srcElement.scrollHeight > 900) {
      this.showFiltre = false;
      this.sharedData.popupFiltre = false;
    }
    if (this.showFiltre == false) this.buttonClick2.emit();
  }
}
