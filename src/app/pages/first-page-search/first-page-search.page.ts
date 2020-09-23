import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-first-page-search',
  templateUrl: './first-page-search.page.html',
  styleUrls: ['./first-page-search.page.scss'],
})
export class FirstPageSearchPage implements OnInit {
  getValue;
  valueParamMetier = '';
  valueParamSecteur = '';
  valueParamZoneGeo = '';
  constructor(private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.valueParamMetier = localStorage.getItem('paramMetier')
    this.valueParamSecteur = localStorage.getItem('paramSecteur')
    this.valueParamZoneGeo = localStorage.getItem('paramZoneGeo')
  }
  goBack() {
    this.location.back();
  }
  goPageNewSearchMetier() {
    this.router.navigate(["/new-search-metier"]);
  }
  goPageNewSearchCriteres() {
    this.router.navigate(["/new-search-criteres"]);
  }
  goPageNewSearchSecteur() {
    this.router.navigate(["/new-search-secteur"]);
  }
  goPageNewSearchZoneGeo() {
    this.router.navigate(["/new-search-zone-geo"]);
  }
  goPageSearch() {
    this.router.navigate(["/footer/searchTab1"]);
  }
}
