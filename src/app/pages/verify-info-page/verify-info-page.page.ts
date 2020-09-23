import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Device } from "@ionic-native/device/ngx";
import { TranslateService } from '@ngx-translate/core';

import { LinkedinServiceService } from "../../providers/linkedin-service/linkedin-service.service";
import { NetworkService } from '../../providers/salesfriends/network/network.service';
import { SharedDataService } from "../../providers/shared-data/shared-data.service";
import { PasswordValidator } from "../../validators/password.validator";
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-verify-info-page",
  templateUrl: "./verify-info-page.page.html",
  styleUrls: ["./verify-info-page.page.scss"]
})
export class VerifyInfoPagePage implements OnInit {
  error: boolean = false;
  clickedButton: boolean = false;
  inputFocus1: boolean = false;
  inputFocus2: boolean = false;
  inputFocus3: boolean = false;
  inputFocus4: boolean = false;
  inputFocus5: boolean = false;
  placeholder = "-";
  placeholder2 = "-";
  password;
  emailLinkedin;
  passwordLinkedin;
  confirmPassword;
  matching_passwords_group;
  isKeyboardHide = true;
  urn: any;
  occupation: any;
  languageUser: any;
  first_name: any;
  last_name: any;
  networks: any;
  picture = "/assets/images/user.png"
  info: any;
  publicIdentifier:any;
  premiumSubscriber;
  numericPassword: any;
  passwordText: any;
  validation_messages = {
    username: [
      { type: "required", message: "Username is required." },
      {
        type: "minlength",
        message: "Username must be at least 5 characters long."
      },
      {
        type: "maxlength",
        message: "Username cannot be more than 25 characters long."
      },
      {
        type: "pattern",
        message: "Your username must contain only numbers and letters."
      },
      {
        type: "validUsername",
        message: "Your username has already been taken."
      }
    ],
    name: [{ type: "required", message: "Name is required." }],
    password: [{ type: "" }]
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedData: SharedDataService,
    private linkedinService: LinkedinServiceService,
    private device: Device,
    private http: HttpClient,
    private networkService: NetworkService,
    private navCtrl: NavController,
    public translate: TranslateService
  ) {

    /* Translate error messages on construct */
    this.translate.get('verify_infos_page_credentials_error').subscribe(
      translate_value => {

        /* Errors for username */
        for(let i in this.validation_messages.username) {
          let message_item = this.validation_messages.username[i];
          let username_msg_type = message_item.type;

          this.validation_messages.username[i].message = translate_value.username[username_msg_type];
        }

        /* Errors for name */
        for(let i in this.validation_messages.name) {
          let message_item = this.validation_messages.name[i];
          let name_msg_type = message_item.type;

          this.validation_messages.name[i].message = translate_value.name[name_msg_type];
        }
      }
    )

  }

  checkPassword(ev) {
    const comoonPassword = this.passwordText.filter(
      val => val == ev.target.value
    );
    this.numericPassword =
      /^\d+$/.test(ev.target.value) || comoonPassword.length != 0;
  }


  ngOnInit() {
    this.http
      .get("../assets/password.txt")

      .subscribe((text: any) => {
        this.passwordText = text.split(",");
      });

    let userData = this.sharedData.getRegisterData();
    console.log("userData",userData)
    this.first_name = userData.first_name
    this.last_name = userData.last_name
    this.emailLinkedin = userData.email
    this.picture = localStorage.getItem("picture")
    this.info = new FormGroup({
      first_name: new FormControl(userData.first_name, Validators.required),
      last_name: new FormControl(userData.last_name, Validators.required),
      email: new FormControl(userData.email, [Validators.required, Validators.email])
    });


    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl(
          "",
          Validators.compose([
            Validators.minLength(8),
            Validators.required
            // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
          ])
        ),
        confirmPassword: new FormControl(
          "",
          Validators.compose([Validators.minLength(8), Validators.required])
        )
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      }
    );
    console.log(this.emailLinkedin, this.passwordLinkedin)

  }
  initializeInfoform(){

    this.info = new FormGroup({
      first_name: new FormControl(this.first_name, Validators.required),
      last_name: new FormControl(this.last_name, Validators.required),
      email: new FormControl(this.emailLinkedin, [Validators.required, Validators.email])
    });
  }
  onBlurPassword1() {
    this.placeholder = "-";
    this.inputFocus4 = false;
  }
  onFocusPassword2() {
    this.placeholder2 = "";
    this.inputFocus5 = true;
  }
  onBlurPassword2() {
    this.placeholder2 = "-";
    this.inputFocus5 = false;
  }
  onFocusPassword1() {
    this.placeholder = "";
    this.inputFocus4 = true;
  }
  onBlur() {
    this.inputFocus1 = false;
  }
  onFocus() {
    this.inputFocus1 = true;
  }
  onBlur2() {
    this.inputFocus2 = false;
  }
  onFocus2() {
    this.inputFocus2 = true;
  }
  onBlur3() {
    this.inputFocus3 = false;
  }
  onFocus3() {
    this.inputFocus3 = true;
  }
  goBack() {
    this.inputFocus1 = false;
    this.inputFocus2 = false;
    this.inputFocus3 = false;
    this.inputFocus4 = false;
    this.inputFocus4 = false;
  }
  changeFunction() {
    this.isKeyboardHide = false;
  }
  get errorControl() {
    return this.info.controls;
  }

  createPassword() {
    this.clickedButton = true;
    this.inputFocus1 = false;
    this.inputFocus2 = false;
    this.inputFocus3 = false;
  }
  goValidCGU() {


   
    this.router.navigate(["/valider-cgu"]);
  }

  gotoNextField(nextElement) {
    nextElement.setFocus();
  }
  goVerifPassword() {
    this.error = false;
    if(this.info.controls.email.valid)
    this.navCtrl.navigateForward('verif-password', {animated: false})
    else
    this.error = true;
  }
}
