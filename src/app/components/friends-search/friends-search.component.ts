import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.scss'],
})
export class FriendsSearchComponent implements OnInit {
  scrollEvent: boolean = false;
  constructor() { }

  ngOnInit() {}

  onScroll(event) {
    this.scrollEvent = true;
    if(event.srcElement.scrollTop <= 10)
    this.scrollEvent = false;
  }

}
