import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "../../providers/shared-data/shared-data.service";
import { UserService } from "../../providers/user-service/user.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.page.html",
  styleUrls: ["./footer.page.scss"]
})
export class FooterPage implements OnInit {
  private pictureUser: any;
  constructor(
    public sharedDataService: SharedDataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((data: any) => {
      this.pictureUser = data.user.linkedin.thumbnail_path;
    });
  }
  closePopup() {
    if (this.sharedDataService.popupDecline) {
      this.sharedDataService.popupDecline = false;
    } else {
      this.sharedDataService.popupAccept = false;
      // this.sharedDataService.popupShake = false
    }
  }
}
