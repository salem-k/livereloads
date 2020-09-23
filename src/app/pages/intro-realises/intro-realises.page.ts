import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-realises',
  templateUrl: './intro-realises.page.html',
  styleUrls: ['./intro-realises.page.scss'],
})
export class IntroRealisesPage implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
