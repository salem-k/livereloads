import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../providers/user-service/user.service";
import { SharedDataService } from "./../../providers/shared-data/shared-data.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage implements OnInit {
  inputFocus: boolean = false;
  email;
  constructor(
    private location: Location,
    private userService: UserService,
    private shared: SharedDataService
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem("emailRetrievePWD");
  }
  onFocus() {
    this.inputFocus = true;
  }
  onBlur() {
    this.inputFocus = false;
  }
  goBack() {
    this.location.back();
  }
  passwordReset() {
    this.shared.showLoading();
    this.userService.passwordReset({ email: this.email }).subscribe(
      data => {
        console.log(data);
        this.shared.hideLoading();
      },
      error => {
        this.shared.hideLoading();
        alert("Problem serveur");
      }
    );
  }
}
