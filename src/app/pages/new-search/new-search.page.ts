import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { myEnterAnimationSearch } from "../../animations/enterSearch";
import { myLeaveAnimationSearch } from "../../animations/leaveSearch";
import { SearchService } from "../../providers/search/search.service";
import { NewSearchCriteresDetailsPage } from "../new-search-criteres-details/new-search-criteres-details.page";
import { IonPullUpFooterState } from 'ionic-pullup';
import { NetworkService } from 'src/app/providers/salesfriends/network/network.service';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';
import { LinkedinServiceService } from 'src/app/providers/linkedin-service/linkedin-service.service';

@Component({
  selector: "app-new-search",
  templateUrl: "./new-search.page.html",
  styleUrls: ["./new-search.page.scss"]
})
export class NewSearchPage implements OnInit {
  getValue;
  valueParamMetier = "";
  valueParamSecteur = "";
  valueParamZoneGeo = "";

  showContent: boolean = false;
  footerState: IonPullUpFooterState;
  state: boolean = false;
  footer: boolean = false;

  nbrRequestsGeo
  nbrRequestsGeoDone
  nbrRequestsSector
  nbrRequestsSectorDone

  geos
  sectors

  constructor(
    private router: Router,
    private location: Location,
    private searchService: SearchService,
    private modalController: ModalController,
    public navCtrl: NavController,
    private networkService: NetworkService,
    public sharedData: SharedDataService,
    private linkedinService: LinkedinServiceService,
  ) {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  ngOnInit() {
    let interval = setTimeout(() => {
      this.footer = true
    }, 1000);
    localStorage.removeItem('paramMetier');
    localStorage.removeItem('paramSecteur');
    localStorage.removeItem('paramZoneGeo');
  }
  ionViewDidEnter() {
    this.valueParamMetier = localStorage.getItem("paramMetier");
    this.valueParamSecteur = localStorage.getItem("paramSecteur");
    this.valueParamZoneGeo = localStorage.getItem("paramZoneGeo");
  }

  onDrag(ev) {
    // console.log(ev.delta);
    if(ev.delta !== 0)
    this.state= true;
    else
    this.state = false;

  }
  footerExpanded() {
    console.log('Footer expanded!');
    this.state = true;
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
    this.state = false;
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
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
  search() {
    this.searchService
      .postSearch({
        poste: localStorage.getItem("paramMetier"),
        location: "string",
        title: "string",
        motif: "string"
      })
      .subscribe(data => {
        console.log(data);
      });
  }
  goPageNewSearchSecteur() {
    this.router.navigate(["/new-search-secteur"]);
  }
  goPageNewSearchZoneGeo() {
    this.router.navigate(["/new-search-zone-geo"]);
  }
  async goPageNewSearchCriteresDetails() {
    const modal = await this.modalController.create({
      component: NewSearchCriteresDetailsPage,
      enterAnimation: myEnterAnimationSearch,
      leaveAnimation: myLeaveAnimationSearch
    });

    await modal.present();
  }
  doSearch(){
    let currentSearch
    currentSearch = JSON.parse(localStorage.getItem("currentSearch"))

    if(!currentSearch.geos || !currentSearch.sectors){
      alert("Vous devez remplir les 3 critères de recherche")
      return
    }

    this.nbrRequestsGeo = this.nbrRequestsGeoDone = 0
    this.nbrRequestsSector = this.nbrRequestsSectorDone = 0

    this.geos = []
    this.sectors = []

    
    this.sharedData.showLoading()
    
    console.log("currentSearch currentSearch currentSearch",currentSearch);
    
    
    if(currentSearch.geos) currentSearch.geos.forEach(async element => {
      this.nbrRequestsGeo++
      this.getUrnGeo(element) 
    })
    if(currentSearch.sectors) currentSearch.sectors.forEach(async element => {
      this.nbrRequestsSector++
      this.getUrnSector(element) 
    })
    

  }
  async getUrnGeo(keyword){
    console.log("this.linkedinService.searchGeo(keyword)",keyword)
    return this.linkedinService.searchGeo(keyword.substring(0, keyword.length - 1)).then(
            ((data:any)=>{
            
                let tempElements = JSON.parse(data.data)
                let returnElements
                tempElements.data.elements.forEach((element:any) => {
                  if(element.text.text == keyword){
                    this.geos.push(element.targetUrn.replace("urn:li:fs_geo:",""))
                  }
                });

                this.nbrRequestsGeoDone++
                this.checkIfRequestsDone()
            })
      );
  }
  async getUrnSector(keyword){
    console.log("this.linkedinService.searchGeo(keyword)",keyword)
    return this.linkedinService.searchSector(keyword.substring(0, keyword.length - 1)).then(
            ((data:any)=>{
            
                let tempElements = JSON.parse(data.data)
                let returnElements
                tempElements.data.elements.forEach((element:any) => {
                  if(element.text.text == keyword){
                    this.sectors.push(element.targetUrn.replace("urn:li:fs_industry:",""))
                  }
                });

                this.nbrRequestsSectorDone++
                this.checkIfRequestsDone()
            })
      );
  }
  getListForSearch(){
    let searchParams = []
        searchParams.push("geoUrn-%3E"+this.geos.join("%7C"))
        searchParams.push("industry-%3E"+this.sectors.join("%7C"))
        searchParams.push("resultType-%3EPEOPLE")
    return searchParams.join()
  }
  checkIfRequestsDone(){
    if(
        this.nbrRequestsSector == this.nbrRequestsSectorDone
        && this.nbrRequestsGeo == this.nbrRequestsGeoDone
        ){ 
        
        console.log("this.sectores",this.sectors);
        console.log("this.geos",this.geos);
        
        let searchParams = this.getListForSearch()
        
        console.log("searchParams : ",searchParams)
        let searchTitre = prompt("Veuillez entrer titre de recherche", "")



        this.linkedinService.globalSearch(0,searchParams,searchTitre).then((data:any)=>{
          let currentSearch = JSON.parse(localStorage.getItem("currentSearch"))
          let params = {
            "poste": currentSearch.sectors.join()+Math.floor(Math.random() * 100) ,
            "location": currentSearch.geos.join()+Math.floor(Math.random() * 100),
            "title": searchTitre+Math.floor(Math.random() * 100),
            "motif": "string33"
          }

          

          console.log("DATA SEARCH LINKEDIN",data);
          console.log("DATA SEARCH LINKEDIN",JSON.parse(data.data));
          console.log("JSON.parse(data.data).data.metadata.",JSON.parse(data.data).data.metadata);

          alert("Total SEARCH = "+JSON.parse(data.data).data.metadata.totalResultCount)

          let searchInProgress = {
            searchParams : searchParams,
            searchPageCounter : 0,
            searchTitre : searchTitre,
            searchTotal : JSON.parse(data.data).data.metadata.totalResultCount,
            id:0
          }
          


          
          

          if(JSON.parse(data.data).data.metadata.totalResultCount > 0){


            this.searchService.postSearch(params).subscribe((data:any)=>{
              
              //localStorage.removeItem("currentSearch")

              console.error("DAT DATA SEACH",data);

              searchInProgress.id = data.id

              localStorage.setItem("searchInProgress",JSON.stringify(searchInProgress))

              this.searchService.getSearch().subscribe(async (data:any)=>{
                this.sharedData.hideLoading()
                
                
                this.sharedData.setSearchs(data.results)
                
                this.linkedinService.doSearch()

                await this.router.navigate(["/footer/searchTab1"]);

              },error=>{
                console.log("Error récupération SEARCHS",error)
                this.sharedData.hideLoading()
              }) 
  
              
            },error=>{
              this.sharedData.hideLoading()
              console.log("erreur save",error);
              if(error.error && error.error.non_field_errors){
                alert("vous avez déjà une recherche avec ces critères")
              }else{
                alert("Erreur : "+JSON.stringify(error))
              }
              
            })

          }else{
            alert("pas de résultats avec cette recherche !")
          }


          
          
        }).catch(erreur=>{
          alert("Erreur Search linkedIN : "+erreur)
        })
      
      
      

    }

  }
}
