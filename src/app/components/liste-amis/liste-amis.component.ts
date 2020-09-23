import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NetworkService } from '../../providers/salesfriends/network/network.service';
import { SharedDataService } from '../../providers/shared-data/shared-data.service';
@Component({
  selector: 'app-liste-amis',
  templateUrl: './liste-amis.component.html',
  styleUrls: ['./liste-amis.component.scss'],
})
export class ListeAmisComponent implements OnInit {
focused: boolean = false;
valueInput = "";
showFiltre: boolean = false;
clicked1: boolean = true;
clicked2: boolean = false;
clicked3: boolean = false;
clicked4: boolean = false;
clicked5: boolean = false;
slidechanged: boolean = false
listResult: any = [];
searchResultF: any = [];
invitations:any =[];
option1 = {
  // loop: true,
  direction: 'vertical',
  allowSlideNext: false,
 };
@Output() buttonClick = new EventEmitter();
@Output() buttonClick2 = new EventEmitter();
@ViewChild('slides') slides: IonSlides;
  constructor(private networkService: NetworkService, private sharedData: SharedDataService) { }

  ngOnInit() {

    this.sharedData.showLoading();
    this.networkService.getNetwork().subscribe(async networks=>{


      this.listResult = networks;
  
      this.listResult=this.listResult.filter((e)=> e.solicitable == true);
      this.listResult.forEach(element => {
        element.slide = false;
      });
      await this.sharedData.hideLoading();
      this.invitations = this.sharedData.getMessageInvitation();
      console.log(this.sharedData.getMessageInvitationSended());
      let data=this.sharedData.getMessageInvitationSended();
      this.invitations=this.invitations.concat(data);
      console.log(this.invitations)
    });
 
  
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
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
    return string.length > length ? 
           string.substring(0, length) + '...' :
           string;
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
  onScroll(event) {
    console.log(event);
   
  }
  slideChanged(ev,ami) {
    console.log(ev.srcElement.scrollWidth);
    if(ev.srcElement.scrollWidth === 500 || ev.srcElement.scrollWidth < 500)
    ami.slide = true
  }
  slideChangedd(event) {
    if(event.srcElement.scrollHeight> 900){
      this.showFiltre = false;
      this.sharedData.popupFiltre = false;
    }
   
    if(this.showFiltre ==false)
    this.buttonClick2.emit();
  }
  changeSlide(ami) {
    ami.slide = true;
  }
  removeElement(ami): void {
    this.listResult = this.listResult.filter(item => item != ami);
  }
  returnSlide(ami) {
    ami.slide = false;
  }
  goToSlide() {
    this.slides.slideTo(1);
  }
  whenChangeSlide(){
    console.log('Do something')
  }
  ondrag(event, item) {
    let percent = event.getSlidingPercent();
    if (percent > 0) {
      // positive
      console.log('right side');
    } else {
      // negative
      console.log('left side');
    }
    if (Math.abs(percent) > 1) {
          console.log(percent)
    }
  }
}
