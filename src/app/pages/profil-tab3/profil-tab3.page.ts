import { ViewChild, ContentChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { PageOfflinePage } from '../page-offline/page-offline.page';
import { PopUpMessageInvitPage } from '../pop-up-message-invit/pop-up-message-invit.page';
import { PopUpRelationPage } from '../pop-up-relation/pop-up-relation.page';
import { PopUpRequalificationCardPage } from '../pop-up-requalification-card/pop-up-requalification-card.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';
import { PopUpInvitPage } from '../pop-up-invit/pop-up-invit.page';
import { LinkedinServiceService } from '../../providers/linkedin-service/linkedin-service.service';
import { MessageService } from '../../providers/message-service/message.service';
import { UserService } from '../../providers/user-service/user.service';
import { Observable, Subscription, interval, timer, Subject } from 'rxjs';
import { SharedDataService } from '../../providers/shared-data/shared-data.service';
import { NetworkService } from '../../providers/salesfriends/network/network.service';
import { FilterService } from '../../providers/filter/filter.service';
import { Scroll } from '@angular/router';



@Component({
  selector: 'app-profil-tab3',
  templateUrl: './profil-tab3.page.html',
  styleUrls: ['./profil-tab3.page.scss'],
})
export class ProfilTab3Page implements OnInit {
  valueProgressBar = 0.25;
  firstPageProfil: boolean = true;
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  pageListAmis: boolean = false;
  pageInvitation: boolean = false;
  pageParam: boolean = false;
  pageNotif: boolean = false;
  dataReturned: any;
  networks: any = [];
  networksSearch: any = [];
  invitSent: boolean = false;
  callApi: Subscription;
  noOfItem = 20;
  networkLength: any;
  friends: any = 0;
  invitation: any = [];
  subscribed = false;
  stopPlay$: Subject<any> = new Subject();
  focused: boolean = false;
  valueInput = "";
  clicked1: boolean = true;
  clicked2: boolean = false;
  clicked3: boolean = false;
  clicked4: boolean = false;
  clicked5: boolean = false;
  showFiltre: boolean = false;
  showFiltre2: boolean = false;
  showFiltre3: boolean = false;
  nbrInvitation: any;
  invitationSended: any = [];
  scrollEvent: boolean = false;
  cards: boolean = true;
  height = false;
  acceptInvit: boolean = false;
  declineInvit: boolean = false;
  @ViewChild(Scroll) scrollElement: Scroll;
  option1 = {
    // loop: true,
    direction: 'vertical',
    allowSlideNext: false,
  };
  listResultMiseEnRelation: any = [];
  constructor(public modalController: ModalController,
    private linkedinService: LinkedinServiceService,
    private messageService: MessageService,
    private userService: UserService,
    private sharedData: SharedDataService,
    private networkService: NetworkService,
    private filterService: FilterService) { }



  async ionViewWillEnter() {

    //this.updateInvitation({id:"98"},"P")
    this.getInvitation();
    this.getPendingInvitation();
   
  }
  getPendingInvitation(){
    this.messageService.getMessagePending().subscribe((data : any) => {
      this.listResultMiseEnRelation = data.results;
     
 
     });
  }
 
  getInvitation() {

    this.messageService.getMessageSended().subscribe((data: any) => {

      this.invitationSended = data.results;
      console.log("invitation sended")
      console.log(data.results)
      this.invitationSended=this.invitationSended.filter((e) => e.status == "P" && e.content != "");
      this.sharedData.setMessageInvitationSended(this.invitationSended);
    })

    this.messageService.getMessageReceived().subscribe((data: any) => {
      let invitations: any = [];
      invitations = data.results;
      console.log("invitation received")
      console.log(data);
      this.invitation = invitations.filter((e) => e.status == "P");
      this.sharedData.setMessageInvitation(this.invitation);

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
  async openModalPopUpRelation() {
    const modal = await this.modalController.create({
      component: PopUpRelationPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }
  openModalFiltre() {
    this.showFiltre = true;
    this.sharedData.popupFiltre = true;
  }
  closeModalFiltre() {
    this.showFiltre = false;
    this.sharedData.popupFiltre = false;
  }
  addBackground() {
    this.showFiltre2 = !this.showFiltre2;
  }
  removeBackground() {
    this.showFiltre2 = false;
  }
  addBackgroundInvitation() {
    this.showFiltre3 = !this.showFiltre3;
  }
  removeBackgroundInvitation() {
    this.showFiltre3 = false;
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
    this.networks = this.filterService.mostRecent(this.networks);
  }
  click4() {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = false;
    this.clicked4 = true;
    this.clicked5 = false;
    this.networks = this.filterService.oldest(this.networks);
  }
  click5() {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = false;
    this.clicked4 = false;
    this.clicked5 = true;
    this.networks = this.filterService.alphabetically(this.networks);
  }
  slideChanged(event) {
    if (event.srcElement.scrollHeight > 900){
      this.showFiltre = false;
      this.sharedData.popupFiltre = false;
    }
    
  }
  async openModalPopUpMessageInvit() {
    const modal = await this.modalController.create({
      component: PopUpMessageInvitPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  async openModalPopUpRequalificationCard() {
    const modal = await this.modalController.create({
      component: PopUpRequalificationCardPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  async openModalPopUpInvit(network, value) {
    console.log(localStorage.getItem('default_msg') == null);
    if (localStorage.getItem('default_msg') == null || (localStorage.getItem('default_msg') != null && value == "update")) {
      this.subscribed = true;
      console.log(this.callApi);
      this.subscribed=true;
      console.log(this.callApi);
      if (this.callApi){
        console.log("destroy")
        network.invitSent = false;
        this.callApi.unsubscribe();
      }
     
      const modal = await this.modalController.create({
        component: PopUpInvitPage,
        cssClass: 'popUpInvit',
        componentProps: { value: network },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });
  
      modal.onDidDismiss()
      .then((data) => {
        // const booleanValue = this.invitSent; // Here's your selected user!
        console.log(data);
        if ( data.data.send == true)
        {
          network.valueProgressBar = 0.25;
          this.invitSent = true;
          
          network.invitSent = true;
          const observable = interval(1000);
          this.callApi = observable.subscribe(()=>{
            if(this.subscribed){
    
              this.sendMessage(data.data.text,network);
              this.subscribed=false;
            }
  
          });
   
        }
        else { 
        this.invitSent = false;
        }
     });
      return await modal.present();
    } else if ((localStorage.getItem('default_msg') != null && value == "add")) {
      this.subscribed = true;
      console.log(this.callApi);
      if (this.callApi) {
        console.log("destroy")
        network.invitSent = false;
        this.callApi.unsubscribe();
      }
      network.valueProgressBar = 0.25;
      this.invitSent = true;

      network.invitSent = true;
      const observable = interval(1000);
      this.callApi = observable.subscribe(() => {
        if (this.subscribed) {

          this.sendMessage(localStorage.getItem('default_msg'), network);
          this.subscribed = false;
        }

      });
    }

  }

  updateInvitation(invitation, value) {
    this.acceptInvit = true;
    console.log(invitation);
    setTimeout(() => {
      this.messageService.updateMessage(invitation.id, value).subscribe((data) => {
        if (value == "A") {
       
          this.networkService.updateContact(invitation.sender.network_id, invitation).subscribe((data) => {
            console.log(data);
          })
  
        }
        this.getInvitation();
      })
    },200)
   
  }
  addContact(network){
    let content ;
    if(localStorage.getItem("default_msg")) {
      content = localStorage.getItem("default_msg");
    } else { 
      content =localStorage.getItem("default_msgWS");
    }
    
    network.valueProgressBar = 0.5;
    network.messageInvit = true;
    this.messageService.saveMsg({
      "type": "I",
      "content": content,
      "status": "P",
      "receiver": network.id
    }).subscribe(async data => {
      this.getInvitation();
      this.getPendingInvitation();
      network.valueProgressBar = 1;
      network.invitSent = true;
    }, (error) => {

      network.valueProgressBar = 1;
      network.invitSent = true;

    })
  }
  sendMessage(txt, network) {


    console.log(network);
    const messageInvit = txt;


    //    this.stopPlay$.next();
    console.log("send message");
    //     this.callApi.unsubscribe();
    this.linkedinService.getCookiesLinkedin().then(data => {
      network.valueProgressBar = 0.45;
      this.linkedinService
        .loginLinkedin(
          localStorage.getItem('username'),
          localStorage.getItem('password')
        )
        .then(
          async loginLinkedinData => {
            console.log(loginLinkedinData);
            loginLinkedinData.headers["set-cookie"].split(";").forEach(value => {

              if (value.indexOf("li_at") != -1) {
                this.linkedinService.li_at = value.split("=")[1].split(";")[0]
                localStorage.setItem('li_at', this.linkedinService.li_at)
              }
              if (value.indexOf("JSESSIONID") != -1) {
                this.linkedinService.csrf = value.split("=")[1].split(";")[0].replace(/\"/g, "")
                localStorage.setItem('csrf', this.linkedinService.csrf);

              }
            });

            network.valueProgressBar = 0.65;


            this.linkedinService.sendMessage(messageInvit.replace('<br>', '\n').replace('<br>', '\n').replace('<br>', '\n').replace('<br><br><br>', '\n').replace("<span class=\"textCard2\">", "\n").replace("</span>", "").replace("<br><br>", "\n"), network.urn.replace("urn:li:fsd_profile:", "")).then(async dataSendMessage => {

              network.valueProgressBar = 0.8;
              console.log({
                "type": "R",
                "content": messageInvit,
                "status": "P",
                "receiver": network.id
              });
              this.messageService.saveMsg({
                "type": "R",
                "content": messageInvit,
                "status": "P",
                "receiver": network.id
              }).subscribe(async data => {
                this.getInvitation();
                this.getPendingInvitation();
                console.log(data);
                network.valueProgressBar = 1;
                network.invitSent = true;
              }, (error) => {
                console.log(error);
                network.valueProgressBar = 1;
                network.invitSent = true;

              })

            }).catch(async err => {


            });


          });

    });
  }
  goListeAmis() {
    this.firstPageProfil = false;
    this.pageListAmis = true;
  }
  goInvit() {
    this.firstPageProfil = false;
    this.pageInvitation = true;
  }
  goParam() {
    this.firstPageProfil = false;
    this.pageParam = true;
  }
  goNotif() {
    this.firstPageProfil = false;
    this.pageNotif = true;
  }
  goBack() {
    this.pageListAmis = false;
    this.pageInvitation = false;
    this.pageParam = false;
    this.pageNotif = false;
    this.firstPageProfil = true;
    this.getInvitation();
  }
  onScroll(event) {
    console.log(event);
    this.scrollEvent = true;
    if (event.srcElement.scrollTop <= 10)
      this.scrollEvent = false;
  }
  repeatCall(){
    setTimeout(()=>{
      this.getInvitation();
      this.getPendingInvitation();
      this.getNetwork();
      this.repeatCall()
    },20000)
  }
  ngOnInit() {
  
   // this.repeatCall()
    this.sharedData.showLoading();
   // this.getInvitation();
    this.userService.getUser().subscribe((data:any) =>{
      this.firstPageProfil = true;
      this.pageNotif = false;
      this.pageParam = false;
      this.pageInvitation = false;
      this.pageListAmis = false;
        localStorage.setItem("username",data.user.linkedin.email)
        localStorage.setItem("password",data.user.linkedin.password)
        localStorage.setItem("User",JSON.stringify(data.user))
        console.log("DATA USERR ::: ",data)
  
     
      // this.messageService.getDefautlMessgeType().subscribe((data: any) => {
      //     console.log(data)
      //     localStorage.setItem('default_msg', data.content ) ;
      //   },(error)=>{
      //     this.messageService.getDefautlMessge("I").subscribe((data: any) => {
      //       console.log(data)
      //       localStorage.setItem('default_msg', data.content + "\n http://www.google.com \n" +
      //        "\n À bientôt," +
      //        "\n ") ;

      //     });
      //   });
        localStorage.setItem("firstCall","1");

        this.getNetwork();

    },async error=>{
      await this.sharedData.hideLoading();
      alert("problème au niveau de recuperation vos informations ")
    })
  }
  getNetwork(){
    this.networkService.getNetwork().subscribe(async networks=>{
        
      console.log("récupération networks",networks);
      this.networks = networks;
      this.networks.sort((a, b) => a.connected_at - b.connected_at );
      
      console.log(this.networks)
      this.networksSearch= networks;
      this.networkLength= this.networks.length;
      this.networks.forEach((value,key) => {
     
        this.networks[key].invitationSended = this.invitationSended.filter((e)=>this.networks[key].id == e.receiver.network_id && e.status == "P").length >0
        || this.invitation.filter((e)=>this.networks[key].id == e.sender.network_id && e.status == "P").length >0
        this.networks[key].messageInvit = false;

      });
      this.messageService.getDefautlMessge("I").subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('default_msgWS', data.content + "<br> http://www.google.com");
      });
      this.messageService.getDefautlMessgeType().subscribe((data: any) => {
        console.log(data);
        if (data.raison != "no content"){
          localStorage.setItem('default_msg', data.content);
        }else {
         
        }
     
      });
      this.friends= this.networks.filter((e)=> e.solicitable == true).length;

      this.linkedinService.getCookiesLinkedin().then((data:any) => {
        this.linkedinService
            .loginLinkedin(localStorage.getItem('username'), localStorage.getItem('password'))
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
                        

                   


                        this.linkedinService.getNetworkInfo(profileData.included[0].publicIdentifier)
                            .then(async (networkInfo:any) => {

                                let data = JSON.parse(networkInfo.data);
               
                                console.log("followersCount : ",data)
                                if(data.data.followersCount > this.networkLength){
                                  console.log(this.networkLength);
                                  this.linkedinService.getNetwork(data.data.followersCount,0)
                                .then(async(network:any)=> {
                                    
                                    let net = JSON.parse(network.data);
                                    let networks = net.included;
                   
                                    let tempArray= [] ;
                
                                   
                                    console.log(networks);
                                    networks.forEach(val=>{
                                        if(val.$type =="com.linkedin.voyager.identity.profile.Profile" || val.$type =="com.linkedin.voyager.dash.identity.profile.Profile"){
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
                                    console.log("tempArray@@@@@@@@@@@")
                                    console.log(tempArray)
                                    const results = tempArray.filter(({ urn: id1 }) => !this.networks.some(({ urn: id2 }) => id2 === id1));
                                    this.networks=this.networks.concat(results);
                                    console.log("results@@@@@@@@@@@@@@@@");
                                    console.log(results);
                                    this.networkService.postNetwork(results).subscribe((data)=>{
                                      console.log(data);
                                     
                                    })
                                  })
                            
                            }
                            });
                          });
                        });
                      });
      await this.sharedData.hideLoading();
      

        //         this.networks.forEach((network, key) => {
   
        // this.linkedinService.getProfile(network.urn.replace("urn:li:fsd_profile:", "")).then((data)=>{
        //     const profile = JSON.parse(data.data);
        //     console.log(profile);
        //     profile.included.forEach(element => {
       
        //       if (element.$type == "com.linkedin.voyager.identity.shared.MiniProfile"){
              
        //         this.networks[key].picture = element.picture.rootUrl + element.picture.artifacts[2].fileIdentifyingUrlPathSegment

        //       }
        //     });
  
        // });
        //         })
      
      localStorage.setItem("myNetwork",JSON.stringify(networks))

     // let myNetwork = JSON.parse(localStorage.getItem("myNetwork"))

     // console.log("myNetwork LOGIN",JSON.stringify(myNetwork))
      // if(myNetwork && myNetwork.length>0)
      //   await this.networkService.saveNetwork()
     
    },async error=>{
      console.log(error);
      await this.sharedData.hideLoading();
      alert("problème au niveau de recuperation votre reseau linkedin")
    })
  }
  doRefresh(ev){
    this.getPendingInvitation();
    this.getInvitation();
    this.getNetwork();
    ev.target.complete();
  }
  removeElement(card): void {
    this.listResultMiseEnRelation = this.listResultMiseEnRelation.filter(item => item != card);
    console.log(card);
    this.messageService.deleteMessagePending(card.id).subscribe((data)=>{
      console.log(data);
    })
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
  search(ev) {
    let searchWord = ev.target.value.split(" ");

    // tslint:disable-next-line:max-line-length
    this.networks = this.networksSearch.filter(network => {
  
        // tslint:disable-next-line:no-unused-expression
       if (network.first_name ) {
          let name = network.first_name.toLowerCase() + " " + network.last_name.toLowerCase();

          return (name.includes(ev.target.value) || network.poste.toLowerCase().includes(ev.target.value));
      } 
      
    }

    );


  }
  loadData(event) {
    if (this.noOfItem < this.networkLength) {
      console.log(this.noOfItem);
      this.noOfItem = this.noOfItem + 20;
    }
    this.infiniteScroll.complete();
  }
  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }
}
