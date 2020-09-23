import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-search-criteres',
  templateUrl: './new-search-criteres.page.html',
  styleUrls: ['./new-search-criteres.page.scss'],
})
export class NewSearchCriteresPage implements OnInit {

  constructor(private location: Location,
              private router: Router
    ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
  goPageNewSearchCriteresDetails() {
    this.router.navigate(['new-search-criteres-details'])
  }
}
