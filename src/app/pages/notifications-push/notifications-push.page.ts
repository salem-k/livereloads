import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notifications-push',
  templateUrl: './notifications-push.page.html',
  styleUrls: ['./notifications-push.page.scss'],
})
export class NotificationsPushPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }
}
