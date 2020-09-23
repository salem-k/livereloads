import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AutoCompleteRegions } from "src/app/providers/linkedin-service/autoCompleteRegions";

@Component({
  selector: "app-new-search-zone-geo",
  templateUrl: "./new-search-zone-geo.page.html",
  styleUrls: ["./new-search-zone-geo.page.scss"]
})
export class NewSearchZoneGeoPage implements OnInit {
  lastGeoSearch;
  currentSearch;
  ionAutoCompleteFocused: boolean = false;
  listResult: any = [];
  constructor(
    private location: Location,
    private navCtrl: NavController,
    private router: Router,
    public autoCompleteRegions: AutoCompleteRegions
  ) {}

  ngOnInit() {}
  onFocus() {
    this.ionAutoCompleteFocused = true;
  }
  onBlur() {
    this.ionAutoCompleteFocused = false;
  }
  ionViewWillEnter() {
    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"));
    this.lastGeoSearch = JSON.parse(localStorage.getItem("lastGeoSearch"));

    console.log("this.currentSearch@@@@@@@@@@@@", this.currentSearch);
  }
  setSearchBarFocus() {
    this.ionAutoCompleteFocused = true;
  }
  goBack() {
    this.location.back();
  }
  getParamAndGoBack() {
    this.navCtrl.back();
  }
  checkListCheck(item) {
    this.listResult.push(item);
    this.lastGeoSearch.push("..");
    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"));
    if (
      this.currentSearch &&
      this.currentSearch.geos &&
      this.currentSearch.geos.length > 0
    ) {
      this.currentSearch.geos.forEach((element, index) => {
        if (element == item) {
          console.log("splace", this.currentSearch);

          this.currentSearch.geos.splice(index, 1);
          console.log("splace", this.currentSearch);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
          return false;
        }
        if (index == this.currentSearch.geos.length - 1) {
          this.currentSearch.geos.push(item);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
        }
      });
    } else {
      if (!this.currentSearch) this.currentSearch = {};
      if (!this.currentSearch.geos) this.currentSearch.geos = [];
      this.currentSearch.geos.push(item);
      localStorage.setItem("currentSearch", JSON.stringify(this.currentSearch));
    }
    console.log("this.currentSearch", this.currentSearch);
    //this.lastGeoSearch = [...this.lastGeoSearch]
    //refresh checkbox

    this.lastGeoSearch.splice(-1, 1);
  }
  removeElement(card): void {
    this.listResult = this.listResult.filter(item => item != card);
  }
  selectItem(item) {
    this.listResult.push(item);
    let lastGeoSearch = JSON.parse(localStorage.getItem("lastGeoSearch"));
    if (
      lastGeoSearch &&
      !lastGeoSearch.find(val => {
        return val == item;
      })
    ) {
      lastGeoSearch.push(item);
      this.lastGeoSearch = lastGeoSearch;
      localStorage.setItem("lastGeoSearch", JSON.stringify(lastGeoSearch));
    }
    if (!lastGeoSearch) {
      lastGeoSearch = [];
      lastGeoSearch.push(item);
      this.lastGeoSearch = lastGeoSearch;
      localStorage.setItem("lastGeoSearch", JSON.stringify(lastGeoSearch));
    }

    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"));
    if (
      this.currentSearch &&
      this.currentSearch.geos &&
      this.currentSearch.geos.length > 0
    ) {
      this.currentSearch.geos.forEach((element, index) => {
        if (element == item) {
          console.log("splace", this.currentSearch);

          this.currentSearch.geos.splice(index, 1);
          console.log("splace", this.currentSearch);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
          return false;
        }
        if (index == this.currentSearch.geos.length - 1) {
          this.currentSearch.geos.push(item);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
        }
      });
    } else {
      if (!this.currentSearch) this.currentSearch = {};
      if (!this.currentSearch.geos) this.currentSearch.geos = [];
      this.currentSearch.geos.push(item);
      localStorage.setItem("currentSearch", JSON.stringify(this.currentSearch));
    }
  }
}
