import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AutoCompleteSectors } from "src/app/providers/linkedin-service/autoCompleteSectors";

@Component({
  selector: "app-new-search-secteur",
  templateUrl: "./new-search-secteur.page.html",
  styleUrls: ["./new-search-secteur.page.scss"]
})
export class NewSearchSecteurPage implements OnInit {
  currentSearch;
  lastSectorSearch;
  ionAutoCompleteFocused: boolean = false;
  listResult: any = [];
  constructor(
    private location: Location,
    private navCtrl: NavController,
    private router: Router,
    public autoCompleteSectors: AutoCompleteSectors
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
    this.lastSectorSearch = JSON.parse(
      localStorage.getItem("lastSectorSearch")
    );

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
    this.lastSectorSearch.push("..");
    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"));
    if (
      this.currentSearch &&
      this.currentSearch.sectors &&
      this.currentSearch.sectors.length > 0
    ) {
      this.currentSearch.sectors.forEach((element, index) => {
        if (element == item) {
          console.log("splace", this.currentSearch);

          this.currentSearch.sectors.splice(index, 1);
          console.log("splace", this.currentSearch);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
          return false;
        }
        if (index == this.currentSearch.sectors.length - 1) {
          this.currentSearch.sectors.push(item);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
        }
      });
    } else {
      if (!this.currentSearch) this.currentSearch = {};
      if (!this.currentSearch.sectors) this.currentSearch.sectors = [];
      this.currentSearch.sectors.push(item);
      localStorage.setItem("currentSearch", JSON.stringify(this.currentSearch));
    }
    console.log("this.currentSearch", this.currentSearch);
    //this.lastGeoSearch = [...this.lastGeoSearch]
    //refresh checkbox

    this.lastSectorSearch.splice(-1, 1);
  }
  removeElement(card): void {
    this.listResult = this.listResult.filter(item => item != card);
  }
  selectItem(item) {
    this.listResult.push(item);
    console.log("liiiist" + this.listResult);
    let lastSectorSearch = JSON.parse(localStorage.getItem("lastSectorSearch"));
    if (
      lastSectorSearch &&
      !lastSectorSearch.find(val => {
        return val == item;
      })
    ) {
      lastSectorSearch.push(item);
      this.lastSectorSearch = lastSectorSearch;
      localStorage.setItem(
        "lastSectorSearch",
        JSON.stringify(lastSectorSearch)
      );
    }
    if (!lastSectorSearch) {
      lastSectorSearch = [];
      lastSectorSearch.push(item);
      this.lastSectorSearch = lastSectorSearch;
      localStorage.setItem(
        "lastSectorSearch",
        JSON.stringify(lastSectorSearch)
      );
    }

    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"));
    if (
      this.currentSearch &&
      this.currentSearch.sectors &&
      this.currentSearch.sectors.length > 0
    ) {
      this.currentSearch.sectors.forEach((element, index) => {
        if (element == item) {
          console.log("splace", this.currentSearch);

          this.currentSearch.sectors.splice(index, 1);
          console.log("splace", this.currentSearch);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
          return false;
        }
        if (index == this.currentSearch.sectors.length - 1) {
          this.currentSearch.sectors.push(item);
          localStorage.setItem(
            "currentSearch",
            JSON.stringify(this.currentSearch)
          );
        }
      });
    } else {
      if (!this.currentSearch) this.currentSearch = {};
      if (!this.currentSearch.sectors) this.currentSearch.sectors = [];
      this.currentSearch.sectors.push(item);
      localStorage.setItem("currentSearch", JSON.stringify(this.currentSearch));
    }
    console.log("this.currentSearch", this.currentSearch);
    //this.lastGeoSearch = [...this.lastGeoSearch]
    //refresh checkbox

    this.lastSectorSearch.splice(-1, 1);
  }
}
