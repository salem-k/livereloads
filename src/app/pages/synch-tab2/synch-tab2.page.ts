import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, Renderer2, ContentChild, Input } from '@angular/core';
import { NavController, ModalController, Platform, AnimationController, IonContent } from '@ionic/angular';
import { OnBoardingDeclineComponent } from 'src/app/components/on-boarding-decline/on-boarding-decline.component';
import { OnBoardingIntroductionComponent } from 'src/app/components/on-boarding-introduction/on-boarding-introduction.component';
import { OnBoardingShakerFeedbackComponent } from 'src/app/components/on-boarding-shaker-feedback/on-boarding-shaker-feedback.component';
import { PopUpMessageInvitPage } from '../pop-up-message-invit/pop-up-message-invit.page';
import { PopUpRelationPage } from '../pop-up-relation/pop-up-relation.page';
import { PopUpRequalificationCardPage } from '../pop-up-requalification-card/pop-up-requalification-card.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';
import {SharedDataService} from "../../providers/shared-data/shared-data.service";
import { Direction, SwingStackComponent, StackConfig, SwingCardComponent } from 'angular2-swing';
import * as _ from 'lodash';
import { RouterOutletService } from 'src/app/services/RouterOutletService';
import USERS from './users.dummy';
import { NetworkService } from '../../providers/salesfriends/network/network.service';
import { IonSlides} from '@ionic/angular';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-synch-tab2',
  templateUrl: './synch-tab2.page.html',
  styleUrls: ['./synch-tab2.page.scss'],
})
export class SynchTab2Page  {
  cards: any[] = [];
  users: any = [];
  stackConfig: StackConfig;
  isLoading: boolean = true;
  segmentView = 'swiping';
  boostView = 'likes';
  @ViewChild('cardStack', {read: SwingStackComponent, static: false}) swingStack: SwingStackComponent;
  @ViewChildren('card', {read: SwingCardComponent}) swingCards: QueryList<SwingCardComponent>;
  from_search:any;
  searchForRelations:any;
  synchPage: boolean = false;
  list: boolean= false;
  matchingDispo: boolean= false;
  friendsSearch: boolean = false;
  history: boolean = false;
  header1: boolean = true;
  headerRech: boolean = false;
  headerHistory: boolean = false;
  listWaiting: boolean = false;
  listAccept: boolean = false;
  cardPage: boolean = true;
  historyPage2: boolean = false;
  heightShadow: boolean = false;
  option1 = {
    allowSlideNext: false,
    allowSlidePrevious: false
   };
   opacity: boolean = true;
   number = 2;
   listResult: any = [];
  @ViewChild('mySlider')  slides: IonSlides;
  @ViewChild(Scroll) scrollElement: Scroll;
  @ViewChild(Scroll) scrollElement2: Scroll;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonContent, { static: false }) scrollArea: IonContent;
  public tabsContentRef: ElementRef;
  // @Input("myScrollVanish") scrollArea;
  // @ViewChild('content', { static: true }) scrollArea: IonContent;
  constructor(
      public modalController: ModalController,
      private platform: Platform,
      public sharedDataService: SharedDataService,
      private navCtrl: NavController,
      private routerService: RouterOutletService,
      private elementRef: ElementRef,
      private renderer: Renderer2,
      private animationCtrl: AnimationController,
      private networkService: NetworkService
    ) {
      this.stackConfig = {
        // Default setting only allows UP, LEFT and RIGHT so you can override this as below
        allowedDirections: [
          Direction.LEFT,
          Direction.RIGHT
        ],
        throwOutConfidence: (offsetX, _offsetY, element) => {
          return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
        },
        transform: (element, x, y, r) => {
          this.onCardDragging(element, x, y, r);
        },
        throwOutDistance: (_d) => {
          return 800;
        }
      };
    }

    ngOnInit() {
      // this.sharedDataService.popupAccept = true;
      this.getData();
      this.listResult = [{'id':'1','imgCard':'/assets/img/imgProfil4.png','textCard':'Arnaud','imgCenterCard':'/assets/img/jeromeDL.png','textNameCard':'Arnaud Gazet','textJobCard':'Président fondateur  ·  SalesFriends','numberIntro':-2,'searchList':[{'searchTitle':'','searchText':'','searchImages':[{'img':'','name':'','job':'','location':''}]}]},
      {'id':'2','imgCard':'/assets/img/imgProfil3.png','textCard':'Sophie','imgCenterCard':'/assets/img/jeromeDL.png','textNameCard':'Sophie Gazet Antoine','textJobCard':'Developpeur Full Stack PhP Mysql','numberIntro':-1,'searchList':[{'searchTitle':'','searchText':'','searchImages':[{'img':'','name':'','job':'','location':''}]}]},
      {'id':'3','imgCard':'/assets/img/imgProfil2.png','textCard':'Jeanne','imgCenterCard':'/assets/img/jeromeDL.png','textNameCard':'Jeanne Jeanne','textJobCard':'Developpeur Full Stack PhP Mysql','numberIntro':-1,'searchList':[{'searchTitle':'','searchText':'','searchImages':[{'img':'','name':'','job':'','location':''}]}]},
      {'id':'4','imgCard':'/assets/img/imgProfil1.png','textCard':'Leonardo','imgCenterCard':'/assets/img/jeromeDL.png','textNameCard':'Leonardo Leonardo','textJobCard':'Developpeur Full Stack PhP Mysql','numberIntro':0,'searchList':[{'searchTitle':'','searchText':'','searchImages':[{'img':'','name':'','job':'','location':''}]}]},
      {'id':'5','imgCard':'/assets/images/arnaud.svg','textCard':'Arnaud','imgCenterCard':'/assets/img/jeromeDL.png','textNameCard':'Arnaud Gazet','textJobCard':'Developpeur Full Stack PhP Mysql','numberIntro':1,'searchList':[{'searchTitle':'','searchText':'','searchImages':[{'img':'','name':'','job':'','location':''}]}]},
      {'id':'6','imgCard':'/assets/images/arnaud.svg','textCard':'Arnaud','imgCenterCard':'/assets/img/jeromeDL.png','textNameCard':'Arnaud Gazet','textJobCard':'Developpeur Full Stack PhP Mysql','numberIntro':1,'searchList':[{'searchTitle':'','searchText':'','searchImages':[{'img':'','name':'','job':'','location':''}]}]},
                                      ]
                                      this.listResult.forEach(element => {
                                        element.opacity = true;
                                      });
                                      this.listResult[0].opacity= false;
  
    }
    async logScrolling($event) {
      let list= this.listResult
      var elementTarget = document.getElementById(list[2].id);
      //console.log(elementTarget.getBoundingClientRect().y );
      let i = 0;
      for(i=0; i<this.listResult.length; i++){
        var pic = document.getElementById(this.listResult[i].id)
         if(pic.getBoundingClientRect().y < 200){
          this.listResult.forEach(element => {
            element.opacity = true;
          });
           this.listResult[i].opacity = false;
         }
         else {
          this.listResult[i].opacity = true;
         }
       
      }
      if ($event.target.localName != "ion-content") {
        // not sure if this is required, just playing it safe
        return;
      }
  
    }
    scrollTo(element,i) {
       console.log(i);
      if(i === '4'){
       
       this.tabsContentRef.nativeElement.scrollTo(0,0);
      }
       let yOffset = document.getElementById(element.id).offsetTop;
       let xOffset = document.getElementById(element.id).offsetWidth;
      // yOffset.scrollIntoView()
      this.content.scrollToPoint(xOffset, yOffset, 1500);
    }
    doRefresh(event) {
      console.log('Begin async operation');
  
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
    onScroll(event) {
      console.log(event)
    }
    ionViewWillEnter() {
      this.slides.lockSwipes(true)
    }
    swipeNext(){
      if(this.number== 1)
      return;
      this.number = this.number -1;
      this.slides.lockSwipes(false)
      this.slides.slideNext();
      this.slides.lockSwipes(true)
    }
    clickImg() {
      console.log('here')
    }
  addShadow() {
    this.historyPage2 = true;
    if(this.platform.is("ios")) {
      this.heightShadow = true;
    }
  }
  removeShadow() {
    this.historyPage2 = false;
    if(this.platform.is("ios")) {
      this.heightShadow = false;
    }
  }
  async openModalPopUpRelation() {
    const modal = await this.modalController.create({
      component: PopUpRelationPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  async openModalPopUpMessageInvit() {
    const modal = await this.modalController.create({
      component: PopUpMessageInvitPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      cssClass: 'popUpInvit'
    });

    return await modal.present();
  }

  async openModalPopUpRequalificationCard() {
    const modal = await this.modalController.create({
      component: PopUpRequalificationCardPage,
      cssClass: 'requalificationCardPopUp',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    return await modal.present();
  }

  async openModalOnBoardingIntroduction() {
    const modal = await this.modalController.create({
      component: OnBoardingIntroductionComponent,
      cssClass: 'onBoardingIntroductionModal',
      animated: false
    });

    return await modal.present();
  }

  async openModalOnBoardingDecline() {
    const modal = await this.modalController.create({
      component: OnBoardingDeclineComponent,
      cssClass: 'onBoardingDeclineModal',
      animated: false
    });

    return await modal.present();
  }

  async openModalOnBoardingShakerFeedback() {
    const modal = await this.modalController.create({
      component: OnBoardingShakerFeedbackComponent,
      cssClass: 'onBoardingShakerFeedbackModal',
      animated: false
    });

    return await modal.present();
  }
  goCardPage(){
    this.synchPage = false;
    this.cardPage = true;

  }
  goFriendsSearch(){
    this.synchPage= false;
    this.header1= false;
    this.headerHistory= false;
    this.list = false;
    this.matchingDispo = false;
    this.headerRech= true;
    this.friendsSearch= true;
    this.cardPage = false;
  }
  goHistory(){
    this.synchPage= false;
    this.header1= false;
    this.headerRech= false;
    this.list = false;
    this.matchingDispo = false;
    this.headerHistory= true;
    this.history= true;
    this.cardPage= false;
  }

  goBack(){
    this.header1 = true;
    this.cardPage = true;
   
    this.headerRech= false;
    this.synchPage = false;
    this.friendsSearch = false;
    this.list = false;
    this.matchingDispo= false;
    this.headerHistory= false;
    this.history= false;
    this.cardPage= false;
  }

  goList(){
    this.synchPage = false;
    this.friendsSearch= false;
    this.headerRech= false;
    this.headerHistory=false;
    this.cardPage=false;
    this.header1= true;
    this.list = true;
    // setTimeout(() => {
    // this.header1= false;
    // this.list = false;
    // this.headerRech= true;
    // this.friendsSearch= true;
    // }, 2000);
    
  }

  goMatchingDispo(){
    this.list= false;
    this.matchingDispo= true;
  }
  showListWaiting(){
    this.listWaiting = true;

  }
  hideListWaiting(){
    this.listWaiting = false;

  }
  showListAccept(){
    this.listAccept = true;
  }
  hideListAccept(){
    this.listAccept = false;

  }

  closePopup(){
    if(this.sharedDataService.popupDecline){
      this.sharedDataService.popupDecline = false
    }else{
      this.sharedDataService.popupAccept = false
      // this.sharedDataService.popupShake = false
    }
  }



  getData() {

    // API call goes here
      this.isLoading = false;
      this.networkService.getRelation().subscribe((data:any)=>{
        console.log(data);
        this.users = data;
        this.from_search = data[0].search.id;
        this.searchForRelations = data[0].id
        this.sharedDataService.setFromSearch(data[0].search.id)

      //  this.addNewCard();
    //    this.addNewCard();
      })
    //  this.users = JSON.parse(localStorage.getItem('myNetwork'));

      // We only need 2 cards visible on the card stack UI
    
  }

  // Called whenever we drag an element
  onCardDragging(element: any, x: number, y: number, r: number) {
    const nope = element.querySelector('.stamp-nope');
    const like = element.querySelector('.stamp-like');
    const calculatedValue = Math.min(100, Math.abs(x) - 20) / 100;// 0 <-> 1 for Opacity

    if (Math.abs(x) > 20 && Math.abs(x) <= 120) {
      if (x < 0) {
        // Swiping LEFT
        window.requestAnimationFrame(() => {
          this.renderer.setStyle(nope, 'opacity', calculatedValue);
          this.renderer.setStyle(like, 'opacity', 0);
        })
      } else {
        // Swiping RIGHT
        window.requestAnimationFrame(() => {
          this.renderer.setStyle(like, 'opacity', calculatedValue);
          this.renderer.setStyle(nope, 'opacity', 0);
        });
      }

      // Zoom effect for the card behind the current one
      let cardBehind = this.getNextCard();
      window.requestAnimationFrame(() => {
       // this.renderer.setStyle(cardBehind, 'transform', `translate3d(0,0,0) scale(${0.94 + 0.06 * calculatedValue}, ${0.94 + 0.06 * calculatedValue})`);
      });
    } else if (x === 0) {
      window.requestAnimationFrame(() => {
        this.renderer.setStyle(nope, 'opacity', 0);
        this.renderer.setStyle(like, 'opacity', 0);
      })
    }

    window.requestAnimationFrame(() => {
      this.renderer.setStyle(element, 'transform', `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`);
    });
  }

  // Add new cards to our array
  addNewCard() {

    let differences = _.difference(this.users, this.cards);
    if (!differences.length) return;

    let randomIndex = Math.floor(Math.random() * (differences.length));
  
    this.cards.push({id:differences[randomIndex].id,name: differences[randomIndex].first_name + " "+differences[randomIndex].last_name,job_title:differences[randomIndex].poste,profile_image_url:differences[randomIndex].thumbnail_path });

    console.info('CURRENT STACK:', this.cards.map(c => c.name));
  }

  getTopCard() {
    return this.swingCards.toArray()[0].getNativeElement();
  }

  getNextCard() {
    return this.swingCards.toArray()[1].getNativeElement();
  }

  async onCardThrown(direction: string = 'LEFT') {
    // Bring the next card to Front
    const cardBehind = this.getNextCard();
    this.renderer.setStyle(cardBehind, 'transform', 'scale(1, 1)');

    this.addNewCard();
    let removedCard = this.cards.shift();
   
    if (direction === 'RIGHT') {

      this.checkMatching(removedCard);
      const modal = await this.modalController.create({
        component: PopUpMessageInvitPage,
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps: { value: removedCard },
      });
  
      await modal.present();
    }
    this.networkService.postNetworkRelationAction(this.searchForRelations,
      {action_type: direction === 'LEFT' ? 'D' : 'A',
      network_id:removedCard.id}).subscribe((data)=>{
      console.log(data)
    })

    console.log(`${direction === 'LEFT' ? 'Disliked' : 'Liked'}: ${removedCard.name}`);
  }
  async onCardThrownButton(direction: string = 'LEFT') {
    // Bring the next card to Front
    console.log("thrown")
    const cardBehind = this.getNextCard();
    this.renderer.setStyle(cardBehind, 'transform', 'scale(1, 1)');
    let element=this.swingCards.toArray()[0].getNativeElement();
  //element.style= 'z-index: -1; touch-action: none; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transform: translate3d(-800px, 138px, 0px) rotate(0deg); ';

    const nope = element.querySelector('.stamp-nope');
    const like = element.querySelector('.stamp-like');
    this.addNewCard();
    let removedCard = this.cards.shift();
    this.networkService.postNetworkRelationAction(this.searchForRelations,
      {action_type: direction === 'LEFT' ? 'D' : 'A',
      network_id:removedCard.id}).subscribe((data)=>{
      console.log(data)
    })

    console.log(removedCard)
    if (direction === 'RIGHT'){
      const modal = await this.modalController.create({
        component: PopUpMessageInvitPage,
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps: { value: removedCard },
      });
  
      await modal.present();
      if (direction === 'RIGHT') {
        this.checkMatching(removedCard);
      } 
    } else {
      const squareA = this.animationCtrl.create()
      .duration(500)
      .addElement(element)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px) rotate(-10deg)', 'translateX(-100px) rotate(-20deg)')
      .fromTo('opacity', '1', '0.2');
      squareA.play();
      window.requestAnimationFrame(() => {
        this.renderer.setStyle(like, 'opacity', 0);
        this.renderer.setStyle(nope, 'opacity', 0.5);
      });
      this.addNewCard();
      setTimeout(() => {
        squareA.pause();
      
      let removedCard = this.cards.shift();
      if (direction === 'RIGHT') {
        this.checkMatching(removedCard);
      }
  
      }, 500);
    }
   
    // window.requestAnimationFrame(() => {
    //   this.renderer.setStyle(element, 'opacity', 0);

    // });
    


  }
  onButtonClicked(type: string = 'DISLIKE') {
    // Show the stamp
    const stamp = this.getTopCard().querySelector(type === 'DISLIKE' ? '.stamp-nope' : '.stamp-like');
    this.renderer.setStyle(stamp, 'opacity', 1);

    // Bring the next card to Front
    const cardBehind = this.getNextCard();
    this.renderer.setStyle(cardBehind, 'transform', 'scale(1, 1)');

    setTimeout(() => {
      this.addNewCard();
      const removedCard = this.cards.shift();

      if (type === 'LIKE') {
        this.checkMatching(removedCard);
      }

      console.log(`${type}: ${removedCard.name}`);
    }, 500);
  }

  async checkMatching(card: any) {
    if (card.name === 'Hieu Pham') {
      console.info('MATCHED!!!');
    }
  }

  getMoreCards() {
    if (this.cards.length == 0) {
      this.addNewCard();
    }
  }

  trackByFn(_index: string, item: any) {
    return item.id;
  }

  onNoMoreSlide(isOnTheLeft: boolean) {
    const stack = this.elementRef.nativeElement.querySelector('.card-stack');
    const className = isOnTheLeft ? 'rotate-left' : 'rotate-right';

    this.renderer.addClass(stack, className);
    setTimeout(() => {
      this.renderer.removeClass(stack, className);
    }, 250);
  }


}

