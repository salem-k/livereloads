import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss'],
})
export class NotifComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {}
  goNotificationsPush() {
    this.router.navigate(["/notifications-push"]);
  }
  goEmailPage() {
    this.router.navigate(["/email-page"]);
  }

}
