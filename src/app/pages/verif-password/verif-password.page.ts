import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Device } from "@ionic-native/device/ngx";
import { TranslateService } from '@ngx-translate/core';

import { LinkedinServiceService } from "../../providers/linkedin-service/linkedin-service.service";
import { SharedDataService } from "../../providers/shared-data/shared-data.service";
import { PasswordValidator } from "../../validators/password.validator";
import {UserService} from "../../providers/user-service/user.service";
import {NetworkService} from "../../providers/salesfriends/network/network.service";

@Component({
  selector: "app-verif-password",
  templateUrl: "./verif-password.page.html",
  styleUrls: ["./verif-password.page.scss"]
})
export class VerifPasswordPage implements OnInit {
  error: boolean = false;
  clicked: boolean = false;
  clickedButton: boolean = false;
  inputFocus1: boolean = false;
  inputFocus2: boolean = false;
  inputFocus3: boolean = false;
  inputFocus4: boolean = false;
  inputFocus5: boolean = false;
  placeholder = "-";
  placeholder2 = "-";
  password;
  emailLinkedin: any;
  passwordLinkedin: any;
  confirmPassword;
  matching_passwords_group;
  isKeyboardHide = true;
  urn: any;
  occupation: any;
  languageUser: any;
  firstName: any;
  lastName: any;
  networks: any;
  info: any;
  picture = "/assets/images/user.png"

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
    private userService: UserService,
    private networkService: NetworkService,
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
    this.picture = localStorage.getItem("picture")
    this.http
      .get("../assets/password.txt")

      .subscribe((text: any) => {
        this.passwordText = text.split(",");
      });
    if (this.activatedRoute.snapshot.paramMap.get("email") != undefined) {
      this.emailLinkedin = this.activatedRoute.snapshot.paramMap.get("email");
      localStorage.setItem("emailLinkedin",this.emailLinkedin)
    }

    if (this.activatedRoute.snapshot.paramMap.get("password") != undefined) {
      this.passwordLinkedin = this.activatedRoute.snapshot.paramMap.get(
        "password"
      );
      localStorage.setItem("passwordLinkedin",this.passwordLinkedin)
    }
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
          Validators.compose([Validators.required])
        )
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      }
    );
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

  gotoNextField(nextElement) {
    nextElement.setFocus();
  }
  goVerifPassword() {
    this.router.navigateByUrl("verif-password");
  }
  async goSpinner() {
    this.error = false;
    if(this.matching_passwords_group.valid && this.matching_passwords_group.controls.confirmPassword.valid && this.matching_passwords_group.controls.password.valid){
      var obj = Object.assign({}, this.sharedData.getRegisterData(), {
        password: this.matching_passwords_group.value.password
      });
  
      console.log("Data for sending in verify info page : ", obj);
      this.sharedData.setRegisterData(obj);
  
      await this.sharedData.showLoading();
      this.userService.register(this.sharedData.getRegisterData()).subscribe(
          async (data: any) => {
  
            localStorage.setItem("token", data.header.replace("'Authorization': 'Token ","").replace("'",""))
  
            this.networkService.getNetwork().subscribe(networks=>{
              console.log("récupération networks",networks)
              localStorage.setItem("networks",JSON.stringify(networks))
            },error=>{
              alert("erreur récupération networks"+error)
            })
  
            await this.networkService.saveNetwork()
  
          },
          async error => {
            await this.sharedData.hideLoading();
            console.log(error.error);
            await this.sharedData.showToastError(error.error)
          }
      )
      
      this.router.navigate(["/spinner-page"]);
    }
    else if(!this.matching_passwords_group.valid ){
      this.error = true;
    }
   

  }
}
