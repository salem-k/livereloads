import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../providers/user-service/user.service";
import { Platform, ModalController, NavController } from "@ionic/angular";
import { SharedDataService } from "../../providers/shared-data/shared-data.service";
import { LinkedinServiceService } from "../../providers/linkedin-service/linkedin-service.service";
import { NetworkService } from '../../providers/salesfriends/network/network.service';
import { SynchPageComponent } from '../../components/synch-page/synch-page.component';
import { TranslateService } from '@ngx-translate/core';
import { fancyAnimation } from 'src/app/animations/enterAnimNavPage';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"]
})
export class LoginPagePage implements OnInit {
  placeholder ='-';
  placeholder2 = '-';
  inputFocus1: boolean = false;
  inputFocus2: boolean = false;
  credentialsForm: FormGroup;
  email;
  password;
  styleConnect: any = false;
  val1;
  networks;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public sharedData: SharedDataService,
    private iab: InAppBrowser,
    private platform: Platform,
    private linkedinService: LinkedinServiceService,
    private networkService: NetworkService,
    private modalController: ModalController,
    public translate: TranslateService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {

    this.credentialsForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    this.sharedData.showLoading();
    this.userService.login(this.credentialsForm.value).subscribe(
      async (data: any) => {

            localStorage.setItem("token", data.key)
            localStorage.setItem("styleConnect", this.styleConnect);
            await this.router.navigateByUrl("/footer/searchTab1");

      },
      async error => {

        await this.sharedData.hideLoading();
        console.log(error);
        if (error.status == 400) {
          this.translate.get('login_page_credentials_error').subscribe(
            translate_value => {
              this.sharedData.showToastError(translate_value);
            }
          )
        } else {
          await this.sharedData.showToastErrorServer();
        }

      }
    );
  }
  signUp() {
    this.navCtrl.navigateForward('valider-cgu', {animated: false})
  }
  goPageForgotPassword() {
    localStorage.setItem('emailRetrievePWD', this.credentialsForm.value.email);
    this.navCtrl.navigateForward('forgot-password',{animation:fancyAnimation})
  }
  onBlurLogin() {
    this.placeholder ='-';
    this.inputFocus1 = false;
  }
  onFocusLogin() {
    this.placeholder = '';
    this.inputFocus1 = true;
  }
  onFocusPassword() {
    this.placeholder2 = '';
    this.inputFocus2 = true;
  }
  onBlurPassword() {
    this.placeholder2 ='-';
    this.inputFocus2 = false;
  }
  gotoNextField(nextElement) {
    nextElement.setFocus();
  }
  
}
