import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-connection',
  templateUrl: './activity-connection.page.html',
  styleUrls: ['./activity-connection.page.scss'],
})
export class ActivityConnectionPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
