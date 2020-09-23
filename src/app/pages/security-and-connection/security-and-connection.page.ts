import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-and-connection',
  templateUrl: './security-and-connection.page.html',
  styleUrls: ['./security-and-connection.page.scss'],
})
export class SecurityAndConnectionPage implements OnInit {

  constructor(private location: Location,
              private router: Router
             ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
  goPageChangePassword() {
    this.router.navigate(['change-password']);
  }
  goPageAlertConnection() {
    this.router.navigate(['alert-connection']);
  }
  goPageActivityConnection() {
    this.router.navigate(['activity-connection']);
  }
  goPageDataDownload() {
    this.router.navigate(['data-download']);
  }
}
