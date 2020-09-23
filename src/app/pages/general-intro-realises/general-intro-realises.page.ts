import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-intro-realises',
  templateUrl: './general-intro-realises.page.html',
  styleUrls: ['./general-intro-realises.page.scss'],
})
export class GeneralIntroRealisesPage implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
