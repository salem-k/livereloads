import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  listWaiting: boolean = false;
  listAccept: boolean = false;
  listWaitingSent: boolean = true;
  historyPage2: boolean = false;
  scrollEvent: boolean = false;
  clicked: boolean = false;
  @Output() buttonClick = new EventEmitter();
  @Output() buttonClick2 = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  goHistory2(){
    this.historyPage2 = true;
    // this.buttonClick.emit();
  }
  goHistory() {
    this.historyPage2 = false;
    this.clicked = true;
    // this.buttonClick2.emit();
  }
  showListWaitingSent(){
    this.listWaitingSent= true;
  }
  hideListWaitingSent(){
    this.listWaitingSent = false;
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
  onScroll(event) {
    this.scrollEvent = true;
    this.buttonClick.emit();
    if(event.srcElement.scrollTop <= 10)
    {
      this.scrollEvent = false;
      this.buttonClick2.emit();
    }
   
  }

}
