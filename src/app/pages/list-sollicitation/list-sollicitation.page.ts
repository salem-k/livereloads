import { NetworkService } from "./../../providers/salesfriends/network/network.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, Scroll } from "@angular/router";
import {ModalController, IonContent, AnimationController, AlertController} from '@ionic/angular';
import { MotifPagePage } from '../motif-page/motif-page.page';
import { PopUpDetailPage } from '../pop-up-detail/pop-up-detail.page';
import { PopUpRelationPage } from '../pop-up-relation/pop-up-relation.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';
import {UserService} from "../../providers/user-service/user.service";
import { RouterOutletService } from 'src/app/services/RouterOutletService';
import {SharedDataService} from "../../providers/shared-data/shared-data.service";
import {LinkedinServiceService} from "../../providers/linkedin-service/linkedin-service.service";


@Component({
  selector: "app-list-sollicitation",
  templateUrl: "./list-sollicitation.page.html",
  styleUrls: ["./list-sollicitation.page.scss"]
})
export class ListSollicitationPage implements OnInit {
  anim: Animation;
  @ViewChild('motif', {static: false}) motif: ElementRef;
  scrollEvent: boolean = false;
  networks
  constructor(
    private router: Router,
    public modalController: ModalController,
    private networkService: NetworkService,
    private animationCtrl: AnimationController,
    private userService:UserService,
    private routerOutletService: RouterOutletService,
    private linkedinService: LinkedinServiceService,
    private sharedData: SharedDataService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.userService.saveDeviceToken().subscribe(data=>{
      console.log("saveDeviceToken ::: ",data)
    },error=>{
      alert("saveDeviceToken ::: "+JSON.stringify(error))
    })

    this.userService.getUser().subscribe((data:any) =>{
      console.log("userData",data)
      localStorage.setItem("username",data.user.linkedin.email)
      localStorage.setItem("password",data.user.linkedin.password)
      localStorage.setItem("User",JSON.stringify(data.user))
      //récupérer li-at dans localStorage

    },error=>{
      console.log("error",error)
    })

  
    // this.networkService.getSollicitation().subscribe(data => {
    //   console.log(data);
    // });
    // this.networkService.getDetailSollication().subscribe(data => {
    //   console.log(data);
    // });
  }

  ngAfterViewInit(){

  }
  ionViewDidEnter() {
    this.routerOutletService.swipebackEnabled = false;
  }
  ionViewDidLeave() {
    this.routerOutletService.swipebackEnabled = true;
  }
  goWaitingScreen() {
    this.router.navigate(["/footer/synchTab2"]);
  }

  async openModalMotif() {
    const modal = await this.modalController.create({
      component: MotifPagePage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });
    return await modal.present();
  }

  async openModalDetail() {
    const modal = await this.modalController.create({
      component: PopUpDetailPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  async openModalPopUpRelation() {
    const modal = await this.modalController.create({
      component: PopUpRelationPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  onScroll(event) {
    this.scrollEvent = true;
    if(event.srcElement.scrollTop <= 10)
    this.scrollEvent = false;
  }



}
