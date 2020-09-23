import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spinner-page',
  templateUrl: './spinner-page.page.html',
  styleUrls: ['./spinner-page.page.scss'],
})
export class SpinnerPagePage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    let interval = setTimeout(() => {
      //this.router.navigate(["/new-search2"]);
      this.router.navigateByUrl("/footer/searchTab1");
    }, 6000);
  }

}
