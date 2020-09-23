import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';
import { SearchService } from 'src/app/providers/search/search.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-search',
  templateUrl: './edit-search.page.html',
  styleUrls: ['./edit-search.page.scss'],
})
export class EditSearchPage implements OnInit {
motif= 'Zagett est extrêment pertinent sur le devellopement de contenu et a notamment fondé la content factory de Sephora. Il aimerait te rencontrer et te présenter des cas qui pourrait vraiment t’interesser. '
clickedCard: boolean = false;  
@ViewChild('searchInput') sInput;
checked: boolean = true;
  id
  selectedSearch
  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    public sharedData: SharedDataService,
    private searchService: SearchService,
    private navCtrl: NavController,
    ) {
      this.router.events.subscribe((e:any) => {
      
        if (e instanceof NavigationEnd && e.url.indexOf( "edit-search" ) ){
            this.initData()
        }
     });
    }

  initData(){
    if(this.activatedRoute.snapshot.paramMap.get('id'))
      this.id = this.activatedRoute.snapshot.paramMap.get('id')
    let ID = this.id
    let searchs = this.sharedData.getSearchs()
    this.selectedSearch = searchs.filter(function(element) {
      if(element.id == ID){
        return element
      }
    })
    this.selectedSearch = this.selectedSearch[0]
  }
  async saveSearch(){
    console.log("this.selectedSearchthis.selectedSearch",this.selectedSearch);
    
    await this.sharedData.showLoading()
    this.searchService.putSearch(this.selectedSearch).subscribe(async (data)=>{
      await this.sharedData.hideLoading()
      await this.navCtrl.navigateForward('/footer/searchTab1')
    },async error=>{
      await this.sharedData.hideLoading()
    })
  }
  ngOnInit() {

  }
  toggle() {
    this.checked = !this.checked;
  }
  editCard() {
    this.clickedCard = true;
  }
  onFocus() {
    this.clickedCard = true;
  }
  onBlur() {
    this.clickedCard = false;
  }
  goBack() {
    this.location.back()
  }
}
