import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alert-connection',
  templateUrl: './alert-connection.page.html',
  styleUrls: ['./alert-connection.page.scss'],
})
export class AlertConnectionPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
