import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutoCompleteMetiers } from 'src/app/providers/linkedin-service/autoCompleteMetiers';

@Component({
  selector: 'app-new-search-metier',
  templateUrl: './new-search-metier.page.html',
  styleUrls: ['./new-search-metier.page.scss'],
})
export class NewSearchMetierPage implements OnInit {
  currentSearch;
  lastJobSearch;
  listResult: any = [];
  ionAutoCompleteFocused : boolean = false;
  constructor(private location: Location,
              private navCtrl: NavController,
              private router: Router,
              public autoCompleteMetiers: AutoCompleteMetiers
             ) { }

  ngOnInit() {
    let i=0;
    // this.listResult[0]=this.autoCompleteMetiers[0]
    // this.listResult.forEach(element => {
    //   element.name = this.autoCompleteMetiers[i];
    //   i++;
    // });
    this.listResult = this.autoCompleteMetiers.getResults("");
    console.log(this.listResult);
  }
  ionViewWillEnter(){
    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"))
    this.lastJobSearch = JSON.parse(localStorage.getItem("lastJobSearch"))
    
    console.log("this.currentSearch@@@@@@@@@@@@",this.currentSearch)
  }
  setSearchBarFocus() {
    this.ionAutoCompleteFocused =true;
  }
  goBack() {
    this.location.back();
  }
  getParamAndGoBack() {
    this.navCtrl.back()
  }
  checkListCheck(item) {
    this.lastJobSearch.push("..")
    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"))
    if(this.currentSearch && this.currentSearch.jobs && this.currentSearch.jobs.length > 0){
      this.currentSearch.jobs.forEach((element, index) => {
        if(element == item){
          console.log("splace",this.currentSearch);
          
          this.currentSearch.jobs.splice(index, 1);
          console.log("splace",this.currentSearch);
          localStorage.setItem("currentSearch",JSON.stringify(this.currentSearch))
          return false
        }
        if(index == this.currentSearch.jobs.length - 1){
          
          this.currentSearch.jobs.push(item)
          localStorage.setItem("currentSearch",JSON.stringify(this.currentSearch))
        }
      })
    }else{
      if(!this.currentSearch) this.currentSearch = {}
      if(!this.currentSearch.jobs) this.currentSearch.jobs = []
      this.currentSearch.jobs.push(item)
      localStorage.setItem("currentSearch",JSON.stringify(this.currentSearch))
    }
    console.log("this.currentSearch",this.currentSearch)
    //this.lastGeoSearch = [...this.lastGeoSearch]
    //refresh checkbox
    
    this.lastJobSearch.splice(-1,1)
  
  }
  selectItem(item){
      let lastJobSearch = JSON.parse(localStorage.getItem("lastJobSearch"))
      if(lastJobSearch && !lastJobSearch.find(val=>{return val==item})){
        lastJobSearch.push(item)
        this.lastJobSearch = lastJobSearch
        localStorage.setItem("lastJobSearch",JSON.stringify(lastJobSearch))
      }
      if(!lastJobSearch){
        lastJobSearch = []
        lastJobSearch.push(item)
        this.lastJobSearch = lastJobSearch
        localStorage.setItem("lastJobSearch",JSON.stringify(lastJobSearch))
      }
  }

}
