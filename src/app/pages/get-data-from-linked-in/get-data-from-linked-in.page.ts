import {Component, OnInit} from '@angular/core';
import {SharedDataService} from "../../providers/shared-data/shared-data.service";
import {AlertController, Platform, NavController} from "@ionic/angular";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {Router} from "@angular/router";
import {LinkedinServiceService} from "../../providers/linkedin-service/linkedin-service.service";
import {NetworkService} from "../../providers/salesfriends/network/network.service";
import {Device} from "@ionic-native/device/ngx";
import {UserService} from "../../providers/user-service/user.service";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { TranslateService } from '@ngx-translate/core';
import { fancyAnimation } from 'src/app/animations/enterAnimNavPage';

@Component({
    selector: 'app-get-data-from-linked-in',
    templateUrl: './get-data-from-linked-in.page.html',
    styleUrls: ['./get-data-from-linked-in.page.scss'],
})
export class GetDataFromLinkedInPage implements OnInit {
    firstName
    lastName
    occupation
    urn
    premiumSubscriber
    publicIdentifier
    picture
    emailLinkedin = localStorage.getItem("username")
    passwordLinkedin = localStorage.getItem("password")
    nbrRequest
    nbrRequestDone
    constructor(
        public sharedData: SharedDataService,
        public platform: Platform,
        private router: Router,
        private linkedinService: LinkedinServiceService,
        private networkService: NetworkService,
        private device: Device,
        private userService: UserService,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private navCtrl: NavController
    ) {
    }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        this.getDataFromLinkedIn()
    }
    getDataFromLinkedIn(){

        FCM.getToken().then(token => {
            console.log("FCM TOKEN",token)
            localStorage.setItem("fcm_token",token)
        })
        let networks
        localStorage.removeItem("myNetwork")
        this.userService.checkEmail(this.emailLinkedin).subscribe(async (success:any)=>{

            this.linkedinService.getCookiesLinkedin().then((data:any) => {
                this.linkedinService
                    .loginLinkedin(this.emailLinkedin, this.passwordLinkedin)
                    .then(
                        (loginLinkedinData:any) => {
                            console.log("data loginLinkedinData",JSON.stringify(loginLinkedinData))
                            loginLinkedinData.headers["set-cookie"].split(";").forEach(value => {
                                if (value.indexOf("li_at") != -1) {
                                    this.linkedinService.li_at = value.split("=")[1].split(";")[0]
                                    localStorage.setItem('li_at',this.linkedinService.li_at)
                                }
                                if (value.indexOf("JSESSIONID") != -1) {
                                    this.linkedinService.csrf = value.split("=")[1].split(";")[0].replace(/\"/g, "")
                                    localStorage.setItem('csrf',this.linkedinService.csrf)
                                }
                            });
                            this.linkedinService.getInfoProfile().then((profileData:any) => {
                                /*
                                      included.firstName
                                      included.lastName
                                      included.publicIdentifier
                                      */
                                console.log("profileData•••••••••••#############", JSON.stringify(profileData));
                                profileData = JSON.parse(profileData.data)
                                this.firstName = profileData.included[0].firstName;
                                this.lastName = profileData.included[0].lastName;
                                this.occupation = profileData.included[0].occupation;
                                this.urn = profileData.included[0].objectUrn;
                                this.premiumSubscriber = profileData.data.premiumSubscriber;
                                this.publicIdentifier = profileData.included[0].publicIdentifier;
                                if(profileData.included[0].picture && profileData.included[0].picture.rootUrl)
                                    localStorage.setItem("picture",profileData.included[0].picture.rootUrl + profileData.included[0].picture.artifacts[2].fileIdentifyingUrlPathSegment)
                                else
                                    localStorage.setItem("picture","/assets/img/img-profil.jpg")
                                /*
                                  this.linkedinService.membreBudge(this.publicIdentifier).then((data) => {
                                    let badge = JSON.parse(data.data);
                                    console.log(badge.premium)
                                  })
                                 */
                                let data = {
                                    email:this.emailLinkedin,
                                    first_name: this.firstName,
                                    last_name: this.lastName,
                                    settings: {
                                        device_uuid: this.device.uuid,
                                        language: window.navigator.language.substring(0, 2),
                                        os_version: this.device.version + " " + this.device.platform,
                                        device_type: this.device.model,
                                        approuve_cgv: true,
                                    },
                                    linkedin: {
                                        email: this.emailLinkedin,
                                        password: this.passwordLinkedin,
                                        urn: this.urn,
                                        occupation: this.occupation,
                                        public_identifier: this.publicIdentifier,
                                        premiumSubscriber: this.premiumSubscriber,
                                        thumbnail_path:localStorage.getItem('picture')

                                    }

                                };
                                console.log("Data for sending in verify info page : ", JSON.stringify(data));
                                this.sharedData.setRegisterData(data);

                                this.linkedinService.getNetworkInfo(encodeURI(profileData.included[0].publicIdentifier))
                                    .then(async (networkInfo:any) => {

                                        let data = JSON.parse(networkInfo.data);
                                        console.log("networkInfo",JSON.stringify(data))
                                        console.log("followersCount : ",data.data.followersCount)
                                        await this.getLinkedInNetwork(data.data.followersCount)
                                    },async erreurNetworkInfo => {
                                        console.log("erreur networkInfo",JSON.stringify(erreurNetworkInfo))
                                        alert("erreur networkInfo"+JSON.stringify(erreurNetworkInfo))
                                        await this.erreurGetData()
                                    });
                            },async errorGetInfoProfile => {
                                console.log("Erreur getInfoProfile",JSON.stringify(errorGetInfoProfile));
                                alert("Erreur getInfoProfile"+JSON.stringify(errorGetInfoProfile))
                                await this.erreurGetData()
                            });
                        },async error => {
                            console.log("Erreur loginLinkedIn",JSON.stringify(error));

                            this.translate.get('get_data_from_linked_error_too_much_connexions').subscribe(
                                async translate_value => {
                                    const alert = await this.alertCtrl.create({
                                        header: translate_value.title,
                                        message: translate_value.message,
                                        buttons: [
                                            {
                                                text: translate_value.ok_button,
                                                handler: async () => {
                                                    await this.router.navigate(["/login-page1"])
                                                }
                                            }
                                        ]
                                    });
                                    await alert.present();
                                }
                            )
                        })
            },async ErrorGetCookiesLinkedin=>{
                console.log("erreur getCookiesLinkedin",JSON.stringify(ErrorGetCookiesLinkedin))
                await this.erreurGetData()
            });

        },async (failed:any)=>{

            this.translate.get('get_data_from_linked_existing_email').subscribe(
                async translate_value => {
                    const alert = await this.alertCtrl.create({
                        header: translate_value.title,
                        message: translate_value.message,
                        buttons: [
                            {
                                text: translate_value.ok_button,
                                handler: async () => {
                                    await this.router.navigate(["/inappbrowser"])
                                }
                            }
                        ]
                    });
                    await alert.present();
                }
            )

        })
    }
    async erreurGetData(){
        this.translate.get('get_data_from_linked_generic_error').subscribe(
            async translate_value => {
                const alert = await this.alertCtrl.create({
                    header: translate_value.title,
                    message: translate_value.message,
                    buttons: [
                    {
                        text: translate_value.no_button,
                        handler: async () => {
                            await this.router.navigate(["/login-page1"])
                        }
                    },
                    {
                        text: translate_value.yes_button,
                        handler: async () => {
                            localStorage.removeItem("__advancedHttpCookieStore__")
                            this.getDataFromLinkedIn()
                        }
                    }
                ]
                });
                await alert.present();
            }
        )
    }
    getLinkedInNetwork(nbrNetwork){
        let i = 0
        this.nbrRequest = 0
        this.nbrRequestDone = 0
        if (i == nbrNetwork){
            this.navCtrl.navigateForward('verify-info-page',{animation:fancyAnimation})
        }else {
            while(i < nbrNetwork){

                this.nbrRequest++
                console.log("get network :::",(i+1000>nbrNetwork)?nbrNetwork-i:1000 ,i)
                this.linkedinService.getNetwork((i+1000>nbrNetwork)?nbrNetwork-i:1000 ,i )
                    .then(async(network:any)=> {
                        this.nbrRequestDone++
                        console.log("Network",this.nbrRequest,this.nbrRequestDone)
                        let net = JSON.parse(network.data);
                        let networks = net.included;
    
                        let tempArray = JSON.parse(localStorage.getItem("myNetwork"))
    
                        if(!tempArray)
                            tempArray = []
                        networks.forEach(val=>{
                            if(val.$type =="com.linkedin.voyager.identity.profile.Profile" || val.$type =="com.linkedin.voyager.dash.identity.profile.Profile"){
                                console.log(val.profilePicture)
                                tempArray.push({
                                  first_name: val.firstName,
                                  last_name: val.lastName,
                                  public_identifier: val.publicIdentifier,
                                  urn: val.entityUrn,
                                  connected_at: new Date().getTime(),
                                  poste: (val.headline)?val.headline:"undefined",
                                  //profile.geoLocationName
                                  location: "location",
                                  source: "L",
                                  thumbnail_path:(val.profilePicture && val.profilePicture.displayImageReference && val.profilePicture.displayImageReference.vectorImage)?val.profilePicture.displayImageReference.vectorImage.rootUrl+val.profilePicture.displayImageReference.vectorImage.artifacts[2].fileIdentifyingUrlPathSegment:""
                                })
                              }
                        })
                        
                        console.log(tempArray[0])
    
                        let tempArrayStr = JSON.stringify(tempArray)
                        tempArrayStr = tempArrayStr.replace(/(\r\n|\n|\r)/gm,' ')
                        
                        console.log(this.nbrRequestDone,"<< == >>",this.nbrRequest)
                        //console.log("JSON.stringify(tempArray)",tempArrayStr);
                        
                        
                        localStorage.setItem("myNetwork",tempArrayStr)
                        localStorage.setItem("firstCall","0")
    
                        console.log(this.nbrRequestDone," == ",this.nbrRequest)
                        
                        if(this.nbrRequestDone == this.nbrRequest)
                            await this.navCtrl.navigateForward('verify-info-page',{animation:fancyAnimation})
    
                    }).catch(async errorGetNetwork=>{
                        console.log("erreur getNetwork",JSON.stringify(errorGetNetwork))
                        alert("erreur getNetwork"+JSON.stringify(errorGetNetwork))
                        await this.erreurGetData()
                    })
                i = i+1000
            }
        }
        
    }
}
