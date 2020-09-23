import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-data-download',
  templateUrl: './data-download.page.html',
  styleUrls: ['./data-download.page.scss'],
})
export class DataDownloadPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
